import React from "react";
import { PhoneNumberField, VerificationInput, SignupButton } from "./index";

interface StepRendererProps {
  currentStep: number;
  phoneNumber: string;
  isVerified: boolean;
  isSignupLoading: boolean;
  showMessage: (
    msg: string,
    type: "success" | "error",
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
