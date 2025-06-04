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

import { usePhoneNumberSync, useMessageHandler } from "./hooks";

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
  const { phoneNumber, handlePhoneNumberChange, syncPhoneNumberToUserInfo } =
    usePhoneNumberSync(setUserInfo);

  const { messageState, showMessage, closeMessage } = useMessageHandler();

  const [currentStep, setCurrentStep] = useState(1);
  const [isVerified, setIsVerified] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  const handleCodeSent = () => {
    setCurrentStep(2);
    syncPhoneNumberToUserInfo();
  };

  const handleExistingUser = () => {
    showMessage(
      "이미 가입된 회원입니다. 로그인 페이지로 이동합니다.",
      "success",
      true
    );
  };

  const handleVerificationSuccess = () => {
    setIsVerified(true);
    setCurrentStep(3);
    syncPhoneNumberToUserInfo();
  };

  const handleResendCode = () => {
    setCurrentStep(1);
  };

  const handleSignupComplete = async () => {
    setIsSignupLoading(true);

    try {
      if (!phoneNumber) {
        throw new Error("전화번호 정보가 없습니다.");
      }

      syncPhoneNumberToUserInfo();

      if (onSignupComplete) {
        await onSignupComplete();
      }

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
            onSuccess={(message) =>
              showMessage(message, "success", false, true)
            }
            onError={(message) => showMessage(message, "error")}
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
