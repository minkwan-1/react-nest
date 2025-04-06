import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { PageContainer, ComponentWrapper } from "../components/layout/common";
import { useAtom } from "jotai";
import { signupUserInfo, completeUserInfo } from "@atom/auth";
import { handleCompleteSignupWithAPI } from "../api/auth/auth";

import {
  PhoneVerificationTitle,
  UserInfoField,
  PhoneNumberField,
  VerificationInput,
  MessageBox,
} from "@components/phone";
import SignupButton from "@components/phone/SignupButton";

const PhoneVerificationPage = () => {
  const [userInfo, setUserInfo] = useAtom(signupUserInfo);

  const [, setNewUserInfo] = useAtom(completeUserInfo);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"info" | "success" | "error">(
    "info"
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load user info from localStorage when component mounts
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setUserInfo(parsedUserInfo);
      } catch (error) {
        console.error("Error parsing stored user info:", error);
      }
    }
  }, [setUserInfo]);

  // 성공 메시지 처리 함수
  const handleSuccess = (successMessage: string) => {
    setMessage(successMessage);
    setMessageType("success");
  };

  // 에러 메시지 처리 함수
  const handleError = (errorMessage: string) => {
    setMessage(errorMessage);
    setMessageType("error");
  };

  // 전화번호 설정 함수
  const handlePhoneNumberChange = (newPhoneNumber: string) => {
    setPhoneNumber(newPhoneNumber);
  };

  // 인증 완료 처리 함수
  const handleVerified = () => {
    setIsVerified(true);
    handleSuccess("전화번호 인증이 완료되었습니다. 회원가입을 완료해주세요.");
  };

  // 최종 가입
  const handleCompleteSignup = async () => {
    if (!userInfo) return handleError("유저 정보가 없습니다.");
    if (!phoneNumber) return handleError("전화번호를 입력해 주세요.");

    const newCompleteUserInfo = { ...userInfo, phoneNumber };
    // Only call setNewUserInfo if it exists
    if (setNewUserInfo) {
      setNewUserInfo(newCompleteUserInfo);
    }

    // 로딩 상태 활성화
    setIsLoading(true);

    try {
      // API를 통해 회원가입 처리
      const result = await handleCompleteSignupWithAPI(newCompleteUserInfo);

      if (result.success) {
        handleSuccess("회원가입이 성공적으로 완료되었습니다.");
        // 회원가입 성공 후 추가 처리 (페이지 이동은 SignupButton에서 처리)
      } else {
        handleError(result.message || "회원가입 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("회원가입 처리 중 오류:", error);
      handleError("회원가입 처리 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <ComponentWrapper sx={{ maxWidth: "600px" }}>
        <Box sx={{ padding: 4 }}>
          <PhoneVerificationTitle />
          <UserInfoField userInfo={userInfo} setUserInfo={setUserInfo} />
          <PhoneNumberField
            onSuccess={handleSuccess}
            onError={handleError}
            onPhoneNumberChange={handlePhoneNumberChange}
          />
          <VerificationInput
            phoneNumber={phoneNumber}
            onSuccess={handleSuccess}
            onError={handleError}
            onVerified={handleVerified}
          />

          {/* 인증 완료 시 회원가입 버튼 표시 */}
          {isVerified && (
            <SignupButton
              onClick={handleCompleteSignup}
              isLoading={isLoading}
            />
          )}

          <MessageBox message={message} messageType={messageType} />
        </Box>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default PhoneVerificationPage;
