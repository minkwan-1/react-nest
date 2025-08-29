import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { signupUserInfo } from "@atom/auth";
import { SetStateAction } from "jotai";

type MessageType = "info" | "success" | "error" | "warning";

interface MessageState {
  open: boolean;
  message: string;
  type: MessageType;
  isExistingUser: boolean;
  isSignupComplete: boolean;
}

interface UsePhoneVerificationOptions {
  userInfo: signupUserInfo | null;
  setUserInfo: (userInfo: SetStateAction<signupUserInfo | null>) => void;
  onSignupComplete?: () => void;
}

export const usePhoneVerification = ({
  setUserInfo,
  onSignupComplete,
}: UsePhoneVerificationOptions) => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  const [messageState, setMessageState] = useState<MessageState>({
    open: false,
    message: "",
    type: "info",
    isExistingUser: false,
    isSignupComplete: false,
  });

  const showMessage = (
    message: string,
    type: MessageType,
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

    if (
      messageState.isExistingUser ||
      messageState.isSignupComplete ||
      messageState.type === "warning"
    ) {
      setTimeout(() => {
        navigate("/start");
      }, 300);
    }
  };

  const handlePhoneNumberChange = (phone: string) => {
    setPhoneNumber(phone);
    setUserInfo((prev) => (prev ? { ...prev, phoneNumber: phone } : null));
  };

  const handleCodeSent = () => {
    setCurrentStep(2);
    setUserInfo((prev) => (prev ? { ...prev, phoneNumber } : null));
  };

  const handleExistingUser = () => {
    showMessage(
      "이미 가입된 회원입니다. 로그인 페이지로 이동합니다.",
      "warning",
      true
    );
  };

  const handleVerificationSuccess = () => {
    setIsVerified(true);
    setCurrentStep(3);
    setUserInfo((prev) => (prev ? { ...prev, phoneNumber } : null));
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

      setUserInfo((prev) => (prev ? { ...prev, phoneNumber } : null));

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

  return {
    currentStep,
    phoneNumber,
    isVerified,
    isSignupLoading,
    messageState,
    showMessage,
    closeMessage,
    handlePhoneNumberChange,
    handleCodeSent,
    handleExistingUser,
    handleVerificationSuccess,
    handleResendCode,
    handleSignupComplete,
  };
};
