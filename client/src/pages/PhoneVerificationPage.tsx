import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { PageContainer, ComponentWrapper } from "../components/layout/common";
import { useAtom } from "jotai";
import { signupUserInfo } from "@atom/auth";

import {
  PhoneVerificationTitle,
  UserInfoField,
  PhoneNumberField,
  VerificationInput,
  MessageBox,
} from "@components/phone";
import SignupButton from "@components/phone/SignupButton"; // 새로 만든 컴포넌트 import

const PhoneVerificationPage = () => {
  const [userInfo, setUserInfo] = useAtom(signupUserInfo);
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

  // 회원가입 완료 처리 함수
  const handleCompleteSignup = () => {
    // 여기에 최종 회원가입 처리 로직 추가
    // 필요한 API 호출 등을 수행한 후 /home으로 리다이렉트
    console.log("회원가입 완료 처리", { userInfo, phoneNumber });
    // 최종 회원가입 API 호출 예시:
    // await axios.post("http://localhost:3000/api/signup", { ...userInfo, phoneNumber });
    // navigate("/home");
  };

  console.log("입력한 전화번호가 부모 컴포넌트에 전달되는지: ", phoneNumber);
  console.log("인증 완료 상태: ", isVerified);

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
