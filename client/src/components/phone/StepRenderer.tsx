import React from "react";
import { PhoneNumberField, VerificationInput, SignupButton } from "./index";

interface StepRendererProps {
  currentStep: number;
  phoneNumber: string;
  isVerified: boolean;
  isSignupLoading: boolean;
  showMessage: (
    msg: string,
    type: "success" | "error" | "warning", // warning 타입 추가
    isExistingUser?: boolean,
    isSignupComplete?: boolean
  ) => void;
  handlePhoneNumberChange: (value: string) => void;
  handleCodeSent: () => void;
  handleExistingUser: () => void;
  handleVerificationSuccess: () => void;
  handleResendCode: () => void;
  handleSignupComplete: () => void;
}

export const StepRenderer: React.FC<StepRendererProps> = ({
  currentStep,
  phoneNumber,
  isVerified,
  isSignupLoading,
  showMessage,
  handlePhoneNumberChange,
  handleCodeSent,
  handleExistingUser,
  handleVerificationSuccess,
  handleResendCode,
  handleSignupComplete,
}) => {
  // 기존 유저 처리 함수
  // src/components/StepRenderer.tsx
  const handleExistingUserDetected = () => {
    showMessage(
      "이미 가입된 휴대폰 번호입니다. 로그인 페이지로 이동합니다.",
      "warning",
      true // ✅ isExistingUser
    );
    handleExistingUser(); // ✅ 실제 처리는 이 함수가 함
  };

  switch (currentStep) {
    case 1:
      return (
        <PhoneNumberField
          onSuccess={(msg) => showMessage(msg, "success")}
          onError={(msg) => showMessage(msg, "error")}
          onPhoneNumberChange={handlePhoneNumberChange}
          onCodeSent={handleCodeSent}
          onExistingUser={handleExistingUserDetected} // 수정된 핸들러 사용
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
          onSuccess={(msg) => showMessage(msg, "success", false, true)}
          onError={(msg) => showMessage(msg, "error")}
          isLoading={isSignupLoading}
          disabled={!isVerified}
        />
      );
    default:
      return null;
  }
};
