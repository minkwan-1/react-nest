// PhoneVerificationPage.tsx
import { useState, useEffect } from "react";
import { Paper } from "@mui/material";
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

const PhoneVerificationPage = () => {
  const [userInfo, setUserInfo] = useAtom(signupUserInfo);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"info" | "success" | "error">(
    "info"
  );
  const [phoneNumber, setPhoneNumber] = useState(""); // 전화번호 상태 추가

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

  console.log("입력한 전화번호가 부모 컴포넌트에 전달되는지: ", phoneNumber);

  return (
    <PageContainer>
      <ComponentWrapper sx={{ maxWidth: "600px" }}>
        <Paper sx={{ padding: 4 }}>
          <PhoneVerificationTitle />
          <UserInfoField userInfo={userInfo} setUserInfo={setUserInfo} />
          <PhoneNumberField
            onSuccess={handleSuccess}
            onError={handleError}
            onPhoneNumberChange={handlePhoneNumberChange} // 전화번호 변경 핸들러 전달
          />
          <VerificationInput
            phoneNumber={phoneNumber} // 전화번호 전달
            onSuccess={handleSuccess}
            onError={handleError}
          />
          <MessageBox message={message} messageType={messageType} />
        </Paper>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default PhoneVerificationPage;
