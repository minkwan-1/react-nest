import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { PageContainer, ComponentWrapper } from "../components/layout/common";
import { useAtom } from "jotai";
import { signupUserInfo, completeUserInfo } from "@atom/auth";

import {
  PhoneVerificationTitle,
  UserInfoField,
  PhoneNumberField,
  VerificationInput,
  MessageBox,
} from "@components/phone";
import SignupButton from "@components/phone/SignupButton"; // 새로 만든 컴포넌트 import

// import { completeUserInfo as completeUserInfoAtom } from "@atom/auth";

const PhoneVerificationPage = () => {
  const [userInfo, setUserInfo] = useAtom(signupUserInfo);
  const [newUserInfo, setNewUserInfo] = useAtom(completeUserInfo);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"info" | "success" | "error">(
    "info"
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerified, setIsVerified] = useState(false); // 인증 완료 상태 추가

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
  const handleCompleteSignup = () => {
    if (!userInfo) return handleError("유저 정보가 없습니다.");
    if (!phoneNumber) return handleError("전화번호를 입력해 주세요.");

    const newCompleteUserInfo = { ...userInfo, phoneNumber };
    setNewUserInfo(newCompleteUserInfo);
    console.log("회원가입 완료 처리", newCompleteUserInfo);
  };

  console.log("입력한 전화번호가 부모 컴포넌트에 전달되는지: ", phoneNumber);
  console.log("인증 완료 상태: ", isVerified);
  console.log("최종 가입 유저 정보: ", newUserInfo);

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
            onVerified={handleVerified} // 인증 완료 콜백 전달
          />

          {/* 인증 완료 시 회원가입 버튼 표시 */}
          {isVerified && <SignupButton onClick={handleCompleteSignup} />}

          <MessageBox message={message} messageType={messageType} />
        </Box>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default PhoneVerificationPage;
