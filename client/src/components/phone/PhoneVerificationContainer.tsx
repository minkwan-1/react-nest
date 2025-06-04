import React from "react";
import { Box, Container } from "@mui/material";
import {
  PhoneVerificationTitle,
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

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <PhoneVerificationTitle step={currentStep} totalSteps={3} />
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
