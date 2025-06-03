import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Paper,
  InputAdornment,
  useTheme,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VerifiedIcon from "@mui/icons-material/Verified";
import LockIcon from "@mui/icons-material/Lock";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";
import { motion } from "framer-motion";

interface VerificationInputProps {
  phoneNumber: string;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  onVerified: () => void;
  onResendCode: () => void;
}

const VerificationInput = ({
  phoneNumber,
  onSuccess,
  onError,
  onVerified,
  onResendCode,
}: VerificationInputProps) => {
  const theme = useTheme();
  const keyColor = "#b8dae1";
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (timerActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timerActive, timeLeft]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      onError("인증 코드를 입력해주세요.");
      return;
    }

    if (!phoneNumber) {
      onError("전화번호를 먼저 입력해주세요.");
      return;
    }

    if (timeLeft === 0) {
      onError("인증 시간이 만료되었습니다. 새로운 인증 코드를 요청해주세요.");
      return;
    }

    setIsVerifying(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/verify-code",
        {
          verificationCode: verificationCode,
          phoneNumber: phoneNumber,
        }
      );

      const message = response.data.message || "전화번호가 인증되었습니다!";
      onSuccess(message);

      if (response.status === 201 || response.status === 200) {
        onVerified();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.message || "인증에 실패했습니다.";
        onError(errorMessage);
      } else {
        onError("인증에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && value.length <= 6)) {
      setVerificationCode(value);
    }
  };

  const handleResendCode = () => {
    setTimeLeft(300);
    setTimerActive(true);
    setVerificationCode("");
    onResendCode();
  };

  const isDarkMode = theme.palette.mode === "dark";
  const borderColor = isDarkMode ? `${keyColor}40` : `${keyColor}30`;
  const successColor = keyColor;

  const isButtonDisabled =
    isVerifying ||
    verificationCode.length !== 6 ||
    !phoneNumber ||
    timeLeft === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
        {/* 상단: 제목 + 타이머 or 새로고침 아이콘 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          {/* 제목: '인증 코드 확인' */}
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{ color: keyColor }}
          >
            인증 코드 확인
          </Typography>

          {/* 우측: 타이머 or 새로고침 버튼 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* 타이머 표시: 타이머가 활성화되어 있을 때만 표시 */}
            {timerActive && (
              <Typography
                variant="body2"
                sx={{
                  color: timeLeft < 60 ? "error.main" : "text.secondary",
                  fontWeight: timeLeft < 60 ? 600 : 400,
                }}
              >
                {formatTime()}
              </Typography>
            )}

            {/* 타이머가 0일 경우: 새로고침 아이콘 노출 */}
            {timeLeft === 0 && (
              <IconButton
                onClick={handleResendCode}
                size="small"
                sx={{
                  color: keyColor,
                  "&:hover": {
                    bgcolor: `${keyColor}20`,
                  },
                }}
              >
                <RefreshIcon />
              </IconButton>
            )}
          </Box>
        </Box>

        {/* 인증 코드 입력 필드 */}
        <TextField
          fullWidth
          label="인증 코드"
          placeholder="6자리 코드 입력"
          value={verificationCode}
          onChange={handleCodeChange}
          margin="normal"
          variant="outlined"
          type="text"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: "action.active" }} />
              </InputAdornment>
            ),

            endAdornment: verificationCode.length === 6 && (
              <InputAdornment position="end">
                <CheckCircleIcon sx={{ color: successColor }} />
              </InputAdornment>
            ),

            sx: {
              borderRadius: 2,
              letterSpacing: "0.2em",
              fontWeight: 500,
              transition: "all 0.3s",
              "&.Mui-focused": {
                boxShadow: `0 0 0 2px ${keyColor}40`,
              },
            },
          }}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            maxLength: 6,
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

        {/* 인증 확인 버튼 */}
        <Button
          variant="contained"
          onClick={handleVerifyCode}
          disabled={isButtonDisabled}
          fullWidth
          sx={{
            mt: 2,
            mb: 1,
            height: "50px",
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            bgcolor: keyColor,
            boxShadow: `0 8px 16px ${keyColor}30`,
            "&:hover": {
              bgcolor: `${keyColor}e0`,
              boxShadow: `0 12px 20px ${keyColor}40`,
              transform: "translateY(-2px)",
            },
            "&.Mui-disabled": {
              bgcolor: theme.palette.mode === "dark" ? "#464646" : "#e0e0e0",
              color: theme.palette.mode === "dark" ? "#8a8a8a" : "#a6a6a6",
            },
            transition: "all 0.3s",
          }}
          endIcon={!isVerifying && <VerifiedIcon />}
        >
          {isVerifying ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "인증 확인"
          )}
        </Button>

        {/* 안내 메시지: 코드 입력 안내 */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", textAlign: "center", mt: 1 }}
        >
          SMS로 전송된 6자리 코드를 입력하세요
        </Typography>

        {/* 시간 만료 시 안내 메시지 */}
        {timeLeft === 0 && (
          <Typography
            variant="caption"
            color="error"
            sx={{ display: "block", textAlign: "center", mt: 1 }}
          >
            인증 시간이 만료되었습니다. 새로고침 버튼을 클릭해 주세요.
          </Typography>
        )}
      </Paper>
    </motion.div>
  );
};

export default VerificationInput;
