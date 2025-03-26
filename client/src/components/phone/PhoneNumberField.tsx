import { useState, useEffect, useCallback } from "react";
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
  // const [sendCodeCount, setSendCodeCount] = useState(0);

  // 전화번호 유효성 검사 (국가 코드 포함 + 숫자 형식 확인)
  const isValidPhoneNumber = (number: string) => {
    const trimmed = number.replace(/\s+/g, "");
    return /^\+\d{10,15}$/.test(trimmed);
  };

  // 전화번호 입력 시 부모 컴포넌트로 전달
  useEffect(() => {
    onPhoneNumberChange(phoneNumber);
  }, [phoneNumber, onPhoneNumberChange]);

  // 디바운싱 함수 (9000ms 지연 적용)
  const debounce = <T extends unknown[]>(
    func: (...args: T) => void,
    delay: number
  ) => {
    let timer: NodeJS.Timeout;
    return (...args: T) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const sendCode = async () => {
    if (!phoneNumber.trim()) {
      onError("전화번호를 입력해주세요.");
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      onError("유효한 전화번호를 입력해주세요. (예: +821012345678)");
      return;
    }

    setIsSending(true);

    try {
      // 디바운싱 테스트를 위한 카운트 증가
      // setSendCodeCount((prevCount) => prevCount + 1);

      const response = await axios.post("http://localhost:3000/api/send-code", {
        toPhoneNumber: phoneNumber.trim(),
      });

      onSuccess(response.data.message || "인증 코드가 발송되었습니다!");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          onError("네트워크 연결에 실패했습니다. 인터넷을 확인해주세요.");
        } else {
          const errorMessage =
            error.response.data?.message || "인증 코드 발송에 실패했습니다.";
          onError(errorMessage);
        }
      } else {
        onError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsSending(false);
    }
  };

  // 디바운싱 적용된 핸들러
  const debouncedSendCode = useCallback(debounce(sendCode, 300), [sendCode]);

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
        onClick={debouncedSendCode}
        disabled={isSending || !phoneNumber.trim()}
        fullWidth
        sx={{ mt: 1, mb: 3, height: "48px" }}
        endIcon={<SendIcon />}
      >
        {isSending ? <CircularProgress size={24} /> : "인증 코드 발송"}
      </Button>

      {/* 디바운싱 테스트 결과 출력 */}
      {/* <Box sx={{ mt: 2 }}>
        <p>API 호출 횟수: {sendCodeCount}</p>
        <p>
          9000ms 내에 버튼을 여러 번 클릭해도 호출 횟수가 한 번만 발생해야
          합니다.
        </p>
      </Box> */}
    </Box>
  );
};

export default PhoneNumberField;
