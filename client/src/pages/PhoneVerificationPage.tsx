import React, { useState } from "react";
import { PageContainer, ComponentWrapper } from "../components/layout/common";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

const PhoneVerificationPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleVerificationCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode(event.target.value);
  };

  const sendVerificationCode = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/sendVerificationCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      if (response.ok) {
        alert("인증번호가 전송되었습니다.");
      } else {
        throw new Error("인증번호 전송에 실패했습니다.");
      }
    } catch (error: unknown) {
      // error는 unknown으로 설정
      if (error instanceof Error) {
        setErrorMessage(error.message); // error가 Error 인스턴스일 경우에만 message에 접근
      } else {
        setErrorMessage("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/verifyCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, verificationCode }),
      });

      if (response.ok) {
        alert("전화번호 인증이 완료되었습니다.");
      } else {
        throw new Error("인증번호가 일치하지 않습니다.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <ComponentWrapper>
        <Box
          sx={{ maxWidth: 600, minHeight: "80vh", margin: "auto", padding: 3 }}
        >
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            휴대폰 인증
          </Typography>

          <TextField
            label="전화번호"
            variant="outlined"
            fullWidth
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={sendVerificationCode}
            disabled={isLoading}
            sx={{ marginBottom: 2 }}
          >
            {isLoading ? <CircularProgress size={24} /> : "인증번호 전송"}
          </Button>

          <TextField
            label="인증번호"
            variant="outlined"
            fullWidth
            value={verificationCode}
            onChange={handleVerificationCodeChange}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={verifyCode}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "인증번호 확인"}
          </Button>

          {errorMessage && (
            <Typography color="error" sx={{ marginTop: 2 }}>
              {errorMessage}
            </Typography>
          )}
        </Box>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default PhoneVerificationPage;
