// components/phone/PhoneNumberField.tsx
import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

interface PhoneNumberFieldProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  onPhoneNumberChange: (phoneNumber: string) => void;
}

const PhoneNumberField = ({
  onSuccess,
  onError,
  onPhoneNumberChange,
}: PhoneNumberFieldProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSending, setIsSending] = useState(false);

  // 전화번호가 변경될 때마다 부모 컴포넌트에 알림
  useEffect(() => {
    onPhoneNumberChange(phoneNumber);
  }, [phoneNumber, onPhoneNumberChange]);

  const handleSendCode = async () => {
    if (!phoneNumber) {
      onError("전화번호를 입력해주세요.");
      return;
    }

    setIsSending(true);
    try {
      console.log("1. 전화번호 전송 frontend: ", phoneNumber);
      const response = await axios.post("http://localhost:3000/api/send-code", {
        toPhoneNumber: phoneNumber,
      });
      onSuccess(response.data.message || "인증 코드가 발송되었습니다!");
    } catch (error: unknown) {
      console.log(error);

      // axios 에러 처리
      if (axios.isAxiosError(error) && error.response) {
        // 서버 응답 에러 메시지가 있으면 사용
        const errorMessage =
          error.response.data?.message || "인증 코드 발송에 실패했습니다.";
        onError(errorMessage);
      } else {
        onError("인증 코드 발송에 실패했습니다.");
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        label="휴대폰 번호"
        placeholder="+821012345678"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        margin="normal"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhoneIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendCode}
        disabled={isSending || !phoneNumber}
        fullWidth
        sx={{ mt: 1, mb: 3, height: "48px" }}
        endIcon={<SendIcon />}
      >
        {isSending ? <CircularProgress size={24} /> : "인증 코드 발송"}
      </Button>
    </Box>
  );
};

export default PhoneNumberField;
