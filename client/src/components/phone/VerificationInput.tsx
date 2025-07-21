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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VerifiedIcon from "@mui/icons-material/Verified";
import LockIcon from "@mui/icons-material/Lock";
import RefreshIcon from "@mui/icons-material/Refresh";
import { motion } from "framer-motion";
import ErrorIcon from "@mui/icons-material/Error";
import { useMutation } from "@tanstack/react-query";
import { verifyCode } from "./api/verifyCodeAPI";

interface VerificationInputProps {
  phoneNumber: string;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  onResendCode: () => void;
  onNext: () => void;
}

const VerificationInput = ({
  phoneNumber,
  onResendCode,
  onNext,
}: VerificationInputProps) => {
  const theme = useTheme();
  const keyColor = "#b8dae1";
  const [verificationCode, setVerificationCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(true);
  const [modal, setModal] = useState({
    open: false,
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });

  const { mutate: submitVerification, isPending: isVerifying } = useMutation({
    mutationFn: verifyCode,
    onSuccess: (data) => {
      console.log("🎉 인증 성공!");
      setModal({
        open: true,
        type: "success",
        title: "인증 성공",
        message: data.message || "전화번호가 인증되었습니다.",
      });
    },
    onError: (error) => {
      console.error("🚨 인증 요청 중 오류 발생:", error);
      setModal({
        open: true,
        type: "error",
        title: "인증 실패",
        message: error.message,
      });
    },
  });

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

  const handleNextStep = () => {
    setModal({ ...modal, open: false });
    onNext();
  };

  const handleVerifyCode = () => {
    console.log("🔐 인증 코드 확인 요청 시작");
    if (!verificationCode || !phoneNumber || timeLeft === 0) {
      console.warn("⚠️ 인증 요청 사전 조건 미충족");
      return;
    }
    submitVerification({ phoneNumber, verificationCode });
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
    <>
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

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", textAlign: "center", mt: 1 }}
          >
            SMS로 전송된 6자리 코드를 입력하세요
          </Typography>

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

      <Dialog
        open={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
            minWidth: 300,
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
          {modal.type === "success" ? (
            <CheckCircleIcon
              sx={{
                fontSize: 48,
                color: keyColor,
                mb: 1,
              }}
            />
          ) : (
            <ErrorIcon
              sx={{
                fontSize: 48,
                color: "error.main",
                mb: 1,
              }}
            />
          )}
          <Typography variant="h6" fontWeight={600}>
            {modal.title}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", py: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {modal.message}
          </Typography>
          {modal.type === "success" && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              최종 회원가입을 완료해주세요.
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pt: 2 }}>
          {modal.type === "success" ? (
            <Button
              onClick={handleNextStep}
              variant="contained"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                bgcolor: keyColor,
                "&:hover": {
                  bgcolor: `${keyColor}e0`,
                },
              }}
            >
              마지막 단계로
            </Button>
          ) : (
            <Button
              onClick={() => setModal({ ...modal, open: false })}
              variant="outlined"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              닫기
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VerificationInput;
