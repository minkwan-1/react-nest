import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import {
  PhoneVerificationTitle,
  UserInfoField,
  PhoneNumberField,
  VerificationInput,
  MessageBox,
  SignupButton,
} from "./index";
import type { signupUserInfo } from "@atom/auth";
import { SetStateAction } from "jotai";
import { useNavigate } from "react-router-dom";

interface PhoneVerificationContainerProps {
  userInfo: signupUserInfo | null;
  setUserInfo: (userInfo: SetStateAction<signupUserInfo | null>) => void;
  onSignupComplete?: () => void;
}

const PhoneVerificationContainer: React.FC<PhoneVerificationContainerProps> = ({
  userInfo,
  setUserInfo,
  onSignupComplete,
}) => {
  const navigate = useNavigate();

  // 현재 단계 (1: 전화번호 입력 → 2: 인증 코드 입력 → 3: 최종 가입)
  // 입력된 전화번호
  // 인증 성공 여부
  // 가입 처리 로딩 상태
  // 메시지 모달 상태
  const [currentStep, setCurrentStep] = useState(1);

  const [phoneNumber, setPhoneNumber] = useState("");

  const [isVerified, setIsVerified] = useState(false);

  const [isSignupLoading, setIsSignupLoading] = useState(false);

  const [messageState, setMessageState] = useState({
    open: false,
    message: "",
    type: "info" as "info" | "success" | "error" | "warning",
    isExistingUser: false,
    isSignupComplete: false,
  });

  // 메시지
  const showMessage = (
    message: string,
    type: "info" | "success" | "error",
    isExistingUser = false,
    isSignupComplete = false
  ) => {
    setMessageState({
      open: true,
      message,
      type,
      isExistingUser,
      isSignupComplete,
    });
  };

  const closeMessage = () => {
    setMessageState((prev) => ({ ...prev, open: false }));
    if (messageState.isExistingUser || messageState.isSignupComplete) {
      setTimeout(() => {
        navigate("/sign-in");
      }, 300);
    }
  };

  // 전화번호 입력 시 userInfo에도 반영
  const handlePhoneNumberChange = (phone: string) => {
    setPhoneNumber(phone);
    setUserInfo((prev) => (prev ? { ...prev, phoneNumber: phone } : null));
  };

  // 인증 코드 전송 후 단계 이동
  const handleCodeSent = () => {
    setCurrentStep(2);
    setUserInfo((prev) => (prev ? { ...prev, phoneNumber } : null));
  };

  // 이미 가입된 유저 → 모달로 안내 후 로그인 페이지로 이동
  const handleExistingUser = () => {
    showMessage(
      "이미 가입된 회원입니다. 로그인 페이지로 이동합니다.",
      "success",
      true
    );
  };

  // 인증 성공 시 단계 이동 및 상태 반영
  const handleVerificationSuccess = () => {
    setIsVerified(true);
    setCurrentStep(3);
    setUserInfo((prev) => (prev ? { ...prev, phoneNumber } : null));
  };

  // 인증 코드 재전송 → 단계 초기화
  const handleResendCode = () => {
    setCurrentStep(1);
  };

  // 최종 회원가입 처리
  const handleSignupComplete = async () => {
    setIsSignupLoading(true);

    try {
      if (!phoneNumber) {
        throw new Error("전화번호 정보가 없습니다.");
      }

      setUserInfo((prev) => (prev ? { ...prev, phoneNumber } : null));

      if (onSignupComplete) {
        await onSignupComplete();
      }

      // 성공 시 모달 표시 및 로그인 페이지 이동 처리
      showMessage(
        "🎉 회원가입이 성공적으로 완료되었습니다!\n잠시 후 로그인 페이지로 이동합니다.",
        "success",
        false,
        true
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "회원가입 완료 중 오류가 발생했습니다.";
      showMessage(errorMessage, "error");
    } finally {
      setIsSignupLoading(false);
    }
  };

  // 단계별 렌더링 처리
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PhoneNumberField
            onSuccess={(msg) => showMessage(msg, "success")}
            onError={(msg) => showMessage(msg, "error")}
            onPhoneNumberChange={handlePhoneNumberChange}
            onCodeSent={handleCodeSent}
            onExistingUser={handleExistingUser}
          />
        );
      case 2:
        return (
          <VerificationInput
            phoneNumber={phoneNumber}
            onSuccess={(msg) => showMessage(msg, "success")}
            onError={(msg) => showMessage(msg, "error")}
            onVerified={handleVerificationSuccess}
            onResendCode={handleResendCode}
          />
        );
      case 3:
        return (
          <SignupButton
            onClick={handleSignupComplete}
            isLoading={isSignupLoading}
            disabled={!isVerified}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <PhoneVerificationTitle step={currentStep} totalSteps={3} />
        <UserInfoField userInfo={userInfo} setUserInfo={setUserInfo} />
        {renderCurrentStep()}
        <MessageBox
          message={messageState.message}
          messageType={messageState.type}
          open={messageState.open}
          onClose={closeMessage}
          isExistingUser={messageState.isExistingUser}
          isSignupComplete={messageState.isSignupComplete}
        />
      </Box>
    </Container>
  );
};

export default PhoneVerificationContainer;
