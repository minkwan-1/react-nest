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
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VerifiedIcon from "@mui/icons-material/Verified";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

interface VerificationInputProps {
  phoneNumber: string;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  onVerified: () => void; // 인증 성공 시 호출될 콜백 함수
}

const VerificationInput = ({
  phoneNumber,
  onSuccess,
  onError,
  onVerified,
}: VerificationInputProps) => {
  const theme = useTheme();
  const keyColor = "#c5a3d5";
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(false);
  // const navigate = useNavigate();

  // 타이머 관리
  useEffect(() => {
    if (phoneNumber && !timerActive) {
      setTimeLeft(300);
      setTimerActive(true);
    }
  }, [phoneNumber, timerActive]);

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

  // 시간 포맷 함수 (5:00 형식)
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

      console.log("twilio에서 떨어지는 response:", response);

      // 성공 메시지 처리
      const message = response.data.message || "전화번호가 인증되었습니다!";
      onSuccess(message);

      // 성공적인 응답 (status 201 or 200)이면 onVerified 콜백 호출
      if (response.status === 201 || response.status === 200) {
        onVerified(); // 인증 성공 시 부모 컴포넌트에 알림
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

  // 코드 입력 핸들러 (자동으로 6자리 제한)
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 허용하고 6자리로 제한
    if (value === "" || (/^\d+$/.test(value) && value.length <= 6)) {
      setVerificationCode(value);
    }
  };

  // 다크모드 감지
  const isDarkMode = theme.palette.mode === "dark";
  const borderColor = isDarkMode ? `${keyColor}40` : `${keyColor}30`;
  const successColor = keyColor;

  // 버튼 비활성화 상태 확인
  const isButtonDisabled =
    isVerifying ||
    verificationCode.length !== 6 ||
    !phoneNumber ||
    timeLeft === 0;

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{ color: keyColor }}
        >
          인증 코드 확인
        </Typography>

        {timerActive && (
          <Typography
            variant="body2"
            sx={{
              color: timeLeft < 60 ? "error.main" : "text.secondary",
              fontWeight: timeLeft < 60 ? 600 : 400,
            }}
          >
            남은 시간: {formatTime()}
          </Typography>
        )}
      </Box>

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
            bgcolor: `${keyColor}e0`, // 약간 더 어두운 버전의 키 컬러
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

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", textAlign: "center", mt: 1 }}
      >
        SMS로 전송된 6자리 코드를 입력하세요
      </Typography>
    </Paper>
  );
};

export default VerificationInput;
