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
    console.log("1. 인증 코드 확인 시도");

    if (!verificationCode) {
      console.log("2. 인증 코드가 비어 있음");
      onError("인증 코드를 입력해주세요.");
      return;
    }

    if (!phoneNumber) {
      console.log("3. 전화번호가 비어 있음");
      onError("전화번호를 먼저 입력해주세요.");
      return;
    }

    setIsVerifying(true);
    console.log("4. 인증 요청 중: ", { verificationCode, phoneNumber });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/verify-code",
        {
          verificationCode: verificationCode,
          phoneNumber: phoneNumber,
        }
      );

      console.log("5. 인증 코드 검증 응답: ", response.data);

      const message = response.data.message || "전화번호가 인증되었습니다!";
      onSuccess(message);

      if (response.data.message?.includes("verified")) {
        console.log("6. 인증 성공, /home으로 리디렉션");
        navigate("/home");
      } else {
        console.log("7. 인증 실패, 메시지: ", response.data.message);
      }
    } catch (error: unknown) {
      console.log("8. 인증 실패 예외 처리: ", error);

      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.message || "인증에 실패했습니다.";
        onError(errorMessage);
      } else {
        onError("인증에 실패했습니다.");
      }
    } finally {
      console.log("9. 인증 처리 완료");
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
