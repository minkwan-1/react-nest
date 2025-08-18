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

// props 타입 정의
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

  // 단계 정의: 전화번호 입력 → 인증번호 입력 → 가입 완료
  const steps = ["phone", "verify", "complete"] as const;

  // 현재 단계 관련 상태 및 함수 제공 (커스텀 훅)
  const { currentStep, stepIndex, nextStep } = useStep(steps);

  // 인증 성공 여부 저장
  // const [isVerified, setIsVerified] = useState(false);

  // 사용자에게 보여줄 메시지 상태 (성공 / 에러)
  const [message, setMessage] = useState({
    text: "",
    type: "success" as "success" | "error",
  });

  // 전화번호 인증 요청 성공 시 → 다음 단계로 이동
  const handleNextStep = () => {
    nextStep();
  };

  // 인증번호 검증 성공 시 → 메시지 표시 후 다음 단계로 자동 이동
  const handleVerificationSuccess = (successMessage: string) => {
    setMessage({ text: successMessage, type: "success" });
    // setIsVerified(true);
    setTimeout(() => {
      nextStep();
    }, 1000); // 1초 후 다음 단계로 자동 진행
  };

  // 인증 실패 시 → 에러 메시지 표시
  const handleVerificationError = (errorMessage: string) => {
    setMessage({ text: errorMessage, type: "error" });
  };

  // 인증번호 재전송 요청 시 (예: 사용자가 코드 못 받았을 때)
  const handleResendCode = () => {
    console.log("코드 재전송 요청");
    // 실제로는 PhoneNumberField 쪽에서 sendCode 함수 다시 실행
  };

  // 단계에 따라 보여줄 컴포넌트 결정
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
            // disabled={!isVerified}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        {/* 현재 단계 표시용 스텝 인디케이터 */}
        <StepIndicator step={stepIndex + 1} totalSteps={steps.length} />

        {/* 사용자 기본 정보 입력 필드 */}
        <UserInfoField userInfo={userInfo} setUserInfo={setUserInfo} />

        {/* 현재 단계에 해당하는 UI 렌더링 */}
        {renderCurrentStep()}

        {/* 메시지 영역 (성공/실패 알림) */}
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
