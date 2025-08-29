import { useState } from "react";
import { Box, Container } from "@mui/material";
import {
  StepIndicator,
  UserInfoField,
  PhoneNumberField,
  VerificationInput,
  SignupButton,
} from "./index";
import type { signupUserInfo } from "@atom/auth";
import { SetStateAction } from "jotai";
import { useStep } from "./hooks/useStep";

interface PhoneVerificationContainerProps {
  userInfo: signupUserInfo | null;
  setUserInfo: (userInfo: SetStateAction<signupUserInfo | null>) => void;
  onSignupComplete?: () => Promise<{
    success: boolean;
    data: unknown | null;
    message?: string;
  }>;
}

function PhoneVerificationContainer(props: PhoneVerificationContainerProps) {
  const { userInfo, setUserInfo, onSignupComplete } = props;

  const steps = ["phone", "verify", "complete"] as const;

  const { currentStep, stepIndex, nextStep } = useStep(steps);

  const [message, setMessage] = useState({
    text: "",
    type: "success" as "success" | "error",
  });

  const handleNextStep = () => {
    nextStep();
  };

  const handleVerificationSuccess = (successMessage: string) => {
    setMessage({ text: successMessage, type: "success" });

    setTimeout(() => {
      nextStep();
    }, 1000);
  };

  const handleVerificationError = (errorMessage: string) => {
    setMessage({ text: errorMessage, type: "error" });
  };

  const handleResendCode = () => {
    console.log("코드 재전송 요청");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "phone":
        return (
          <PhoneNumberField
            onNext={handleNextStep}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        );

      case "verify":
        return (
          <VerificationInput
            onNext={handleNextStep}
            phoneNumber={userInfo?.phoneNumber || ""}
            onSuccess={handleVerificationSuccess}
            onError={handleVerificationError}
            onResendCode={handleResendCode}
          />
        );

      case "complete":
        return (
          <SignupButton
            onClick={onSignupComplete}
            onSuccess={(msg) => setMessage({ text: msg, type: "success" })}
            onError={(msg) => setMessage({ text: msg, type: "error" })}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <StepIndicator step={stepIndex + 1} totalSteps={steps.length} />

        <UserInfoField userInfo={userInfo} setUserInfo={setUserInfo} />

        {renderCurrentStep()}

        {message.text && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor:
                message.type === "error" ? "error.light" : "success.light",
              borderRadius: 1,
            }}
          >
            {message.text}
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default PhoneVerificationContainer;
