// PhoneVerificationPage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import { PageContainer, ComponentWrapper } from "../components/layout/common";
import axios from "axios";
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
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useAtom(signupUserInfo);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"info" | "success" | "error">(
    "info"
  );

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

  const handleSendCode = async (phoneNumber: string) => {
    setIsSending(true);
    try {
      const response = await axios.post("http://localhost:3000/api/send-code", {
        toPhoneNumber: phoneNumber,
      });
      setMessage(response.data.message || "인증 코드가 발송되었습니다!");
      setMessageType("success");
    } catch (error) {
      console.log(error);
      setMessage("인증 코드 발송에 실패했습니다.");
      setMessageType("error");
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyCode = async (code: string) => {
    setIsVerifying(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/verify-code",
        {
          verificationCode: code,
        }
      );
      setMessage(response.data.message || "전화번호가 인증되었습니다!");
      setMessageType("success");
      if (response.data.message.includes("verified")) navigate("/home");
    } catch (error) {
      console.log(error);
      setMessage("인증에 실패했습니다.");
      setMessageType("error");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <PageContainer>
      <ComponentWrapper sx={{ maxWidth: "600px" }}>
        <Paper sx={{ padding: 4 }}>
          <PhoneVerificationTitle />
          <UserInfoField userInfo={userInfo} setUserInfo={setUserInfo} />
          <PhoneNumberField onSend={handleSendCode} isSending={isSending} />
          <VerificationInput
            onVerify={handleVerifyCode}
            isVerifying={isVerifying}
          />
          <MessageBox message={message} messageType={messageType} />
        </Paper>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default PhoneVerificationPage;
