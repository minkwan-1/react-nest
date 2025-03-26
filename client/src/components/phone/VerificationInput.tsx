// components/phone/VerificationInput.tsx
import { useState } from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface VerificationInputProps {
  phoneNumber: string;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

const VerificationInput = ({
  phoneNumber,
  onSuccess,
  onError,
}: VerificationInputProps) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      onError("인증 코드를 입력해주세요.");
      return;
    }

    if (!phoneNumber) {
      onError("전화번호를 먼저 입력해주세요.");
      return;
    }

    setIsVerifying(true);
    try {
      console.log("5. 인증 번호와 휴대전화 번호 전달: ", {
        verificationCode,
        phoneNumber,
      });
      const response = await axios.post(
        "http://localhost:3000/api/verify-code",
        {
          verificationCode: verificationCode,
          phoneNumber: phoneNumber,
        }
      );

      const message = response.data.message || "전화번호가 인증되었습니다!";
      onSuccess(message);

      // 성공적으로 인증되면 홈 페이지로 이동
      if (response.data.message?.includes("verified")) {
        navigate("/home");
      }
    } catch (error: unknown) {
      console.log(error);

      // axios 에러 처리
      if (axios.isAxiosError(error) && error.response) {
        // 서버 응답 에러 메시지가 있으면 사용
        const errorMessage =
          error.response.data?.message || "인증에 실패했습니다.";
        onError(errorMessage);
      } else {
        onError("인증에 실패했습니다.");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        label="인증 코드"
        placeholder="6자리 코드를 입력하세요"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleVerifyCode}
        disabled={isVerifying || !verificationCode || !phoneNumber}
        fullWidth
        sx={{ mt: 1, mb: 3, height: "48px" }}
        endIcon={<CheckCircleIcon />}
      >
        {isVerifying ? <CircularProgress size={24} /> : "인증 확인"}
      </Button>
    </Box>
  );
};

export default VerificationInput;
