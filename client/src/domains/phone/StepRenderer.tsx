import React from "react";
import { PhoneNumberField, VerificationInput, SignupButton } from "./index";

interface StepRendererProps {
  currentStep: number;
  phoneNumber: string;
  isVerified: boolean;
  isSignupLoading: boolean;
  showMessage: (
    msg: string,
    type: "success" | "error" | "warning",
    isExistingUser?: boolean,
    isSignupComplete?: boolean
  ) => void;
  handlePhoneNumberChange: (value: string) => void;
  handleCodeSent: () => void;
  handleExistingUser: () => void;
  handleVerificationSuccess: () => void;
  handleResendCode: () => void;
  handleSignupComplete: () => Promise<{
    success: boolean;
    data: unknown | null;
    message?: string;
  }>;
}

export const StepRenderer: React.FC<StepRendererProps> = ({
  currentStep,
  phoneNumber,
  isVerified,
  isSignupLoading,
  showMessage,
  handlePhoneNumberChange,
  handleCodeSent,
  // handleExistingUser,
  handleVerificationSuccess,
  handleResendCode,
  handleSignupComplete,
}) => {
  // const handleExistingUserDetected = () => {
  //   showMessage(
  //     "이미 가입된 휴대폰 번호입니다. 로그인 페이지로 이동합니다.",
  //     "warning",
  //     true
  //   );
  //   handleExistingUser();
  // };

  switch (currentStep) {
    case 1:
      return (
        <PhoneNumberField
          onSuccess={(msg: string) => showMessage(msg, "success")}
          onError={(msg: string) => showMessage(msg, "error")}
          onPhoneNumberChange={handlePhoneNumberChange}
          onNext={handleCodeSent}
          // onExistingUser={handleExistingUserDetected}
        />
      );
    case 2:
      return (
        <VerificationInput
          phoneNumber={phoneNumber}
          onSuccess={(msg: string) => showMessage(msg, "success")}
          onError={(msg: string) => showMessage(msg, "error")}
          onNext={handleVerificationSuccess}
          onResendCode={handleResendCode}
        />
      );
    case 3:
      return (
        <SignupButton
          onClick={handleSignupComplete}
          onSuccess={(msg: string) => showMessage(msg, "success", false, true)}
          onError={(msg: string) => showMessage(msg, "error")}
          isLoading={isSignupLoading}
          disabled={!isVerified}
        />
      );
    default:
      return null;
  }
};
