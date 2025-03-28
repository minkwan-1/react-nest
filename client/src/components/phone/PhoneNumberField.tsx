import { useState, useEffect, useCallback } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { motion } from "framer-motion";

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
  const theme = useTheme();
  const keyColor = "#03cb84"; // 키 컬러 정의
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // 전화번호 유효성 검사 (국가 코드 포함 + 숫자 형식 확인)
  const isValidPhoneNumber = (number: string) => {
    const trimmed = number.replace(/\s+/g, "");
    return /^\+\d{10,15}$/.test(trimmed);
  };

  const isValidFormat = phoneNumber ? isValidPhoneNumber(phoneNumber) : true;

  // 전화번호 입력 시 부모 컴포넌트로 전달
  useEffect(() => {
    onPhoneNumberChange(phoneNumber);
  }, [phoneNumber, onPhoneNumberChange]);

  // 디바운싱 함수 (300ms 지연 적용)
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
  const debouncedSendCode = useCallback(debounce(sendCode, 300), [phoneNumber]);

  // 다크모드 감지
  const isDarkMode = theme.palette.mode === "dark";
  const borderColor = isDarkMode ? `${keyColor}40` : `${keyColor}30`;

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 4,
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: borderColor,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography
        variant="subtitle1"
        fontWeight={600}
        sx={{ mb: 2, color: keyColor }}
      >
        휴대폰 번호 인증
      </Typography>

      <Box sx={{ mb: 2, position: "relative" }}>
        <TextField
          fullWidth
          label="휴대폰 번호"
          placeholder="+821012345678"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          margin="normal"
          variant="outlined"
          error={phoneNumber !== "" && !isValidFormat}
          helperText={
            phoneNumber !== "" && !isValidFormat
              ? "올바른 형식의 전화번호를 입력해주세요. (예: +821012345678)"
              : " "
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon
                  sx={{
                    color: isFocused ? keyColor : "action.active",
                    transition: "color 0.3s",
                  }}
                />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 2,
              transition: "all 0.3s",
              "&.Mui-focused": {
                boxShadow: `0 0 0 2px ${keyColor}40`,
              },
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              transition: "all 0.3s",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: keyColor,
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: keyColor,
            },
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="contained"
            onClick={debouncedSendCode}
            disabled={isSending || !phoneNumber.trim() || !isValidFormat}
            fullWidth
            sx={{
              mt: 2,
              mb: 1,
              height: "50px",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: `0 8px 16px ${keyColor}30`,
              bgcolor: keyColor,
              "&:hover": {
                bgcolor: `${keyColor}e0`,
                boxShadow: `0 12px 20px ${keyColor}40`,
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s",
            }}
            endIcon={!isSending && <SendIcon />}
          >
            {isSending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "인증 코드 발송"
            )}
          </Button>
        </motion.div>
      </Box>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", textAlign: "center" }}
      >
        국가 코드를 포함한 휴대폰 번호를 입력해주세요
      </Typography>
    </Paper>
  );
};

export default PhoneNumberField;
