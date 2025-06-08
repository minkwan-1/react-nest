import React from "react";
import { Box, Container } from "@mui/material";
import {
  StepIndicator,
  UserInfoField,
  MessageBox,
  StepRenderer,
} from "./index";
import type { signupUserInfo } from "@atom/auth";
import { SetStateAction } from "jotai";

import { usePhoneVerification } from "./hooks/usePhoneVerification";

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
  const {
    currentStep,
    phoneNumber,
    isVerified,
    isSignupLoading,
    messageState,
    closeMessage,
    handlePhoneNumberChange,
    handleCodeSent,
    handleExistingUser,
    handleVerificationSuccess,
    handleResendCode,
    handleSignupComplete,
    showMessage,
  } = usePhoneVerification({ userInfo, setUserInfo, onSignupComplete });

  // const testArray = [1, 2, 3];
  // const [step, setStep] = useState([]);
  // const [stepIndex, setStepIndex] = useState(0);

  // const currentStep = step[stepIndex];

  // const handleStep = (stepIndex) => {
  //   setStepIndex(stepIndex + 1);
  // };

  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ py: 4 }}>
          {/* step indicator로 컴포넌트명 변경 */}
          <StepIndicator step={currentStep} totalSteps={3} />
          <UserInfoField userInfo={userInfo} setUserInfo={setUserInfo} />
          <StepRenderer
            currentStep={currentStep}
            phoneNumber={phoneNumber}
            isVerified={isVerified}
            isSignupLoading={isSignupLoading}
            showMessage={showMessage}
            handlePhoneNumberChange={handlePhoneNumberChange}
            handleCodeSent={handleCodeSent}
            handleExistingUser={handleExistingUser}
            handleVerificationSuccess={handleVerificationSuccess}
            handleResendCode={handleResendCode}
            handleSignupComplete={handleSignupComplete}
          />
        </Box>
      </Container>
      <MessageBox
        message={messageState.message}
        messageType={messageState.type}
        open={messageState.open}
        onClose={closeMessage}
        isExistingUser={messageState.isExistingUser}
        isSignupComplete={messageState.isSignupComplete}
      />
    </>
  );
};

export default PhoneVerificationContainer;
