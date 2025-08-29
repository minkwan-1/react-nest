import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Paper,
  InputAdornment,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { requestVerificationCodeAPI } from "./api/requestVerificationCodeAPI";
import type { signupUserInfo } from "@atom/auth";
import { SetStateAction } from "jotai";

type PhoneNumberFieldProps = {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
  onPhoneNumberChange?: (value: string) => void;
  onNext: () => void;
  onExistingUser?: () => void;
  userInfo?: signupUserInfo | null;
  setUserInfo?: (userInfo: SetStateAction<signupUserInfo | null>) => void;
};

const PhoneNumberField = ({
  onSuccess,
  onError,
  onPhoneNumberChange,
  onNext,
  onExistingUser,
  userInfo,
  setUserInfo,
}: PhoneNumberFieldProps) => {
  const theme = useTheme();
  const keyColor = "#b8dae1";

  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber || "");
  const [isFocused, setIsFocused] = useState(false);
  const [modal, setModal] = useState({
    open: false,
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });

  const { mutate: requestCode, isPending: isSending } = useMutation({
    mutationFn: requestVerificationCodeAPI,
    onSuccess: (data) => {
      if (
        data?.message ===
        "이미 가입된 휴대폰 번호입니다. 다른 로그인 방법을 이용해주세요."
      ) {
        onExistingUser?.();
      } else {
        const successMessage =
          data?.message || `${phoneNumber}로 인증 코드가 전송되었습니다.`;
        setModal({
          open: true,
          type: "success",
          title: "인증 코드 요청 완료",
          message: successMessage,
        });
        onSuccess?.(successMessage);
      }
    },
    onError: (error) => {
      const errorMessage =
        error.message || "인증 코드 전송에 실패했습니다. 다시 시도해주세요.";
      setModal({
        open: true,
        type: "error",
        title: "인증 코드 전송 실패",
        message: errorMessage,
      });
      onError?.(errorMessage);
    },
  });

  useEffect(() => {
    if (userInfo?.phoneNumber) {
      setPhoneNumber(userInfo.phoneNumber);
    }
  }, [userInfo?.phoneNumber]);

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    onPhoneNumberChange?.(value);
    setUserInfo?.((prev) => (prev ? { ...prev, phoneNumber: value } : prev));
  };

  const isValidPhoneNumber = (number: string) => {
    const trimmed = number.replace(/\s+/g, "");
    const phoneRegex = /^010\d{8}$/;
    return phoneRegex.test(trimmed);
  };

  const isValidFormat = phoneNumber ? isValidPhoneNumber(phoneNumber) : true;

  const sendCode = () => {
    if (!phoneNumber.trim() || !isValidPhoneNumber(phoneNumber)) {
      onError?.("유효한 전화번호를 입력해주세요.");
      return;
    }
    requestCode(phoneNumber);
  };

  const handleNextStep = () => {
    setModal({ ...modal, open: false });
    onNext();
  };

  const isDarkMode = theme.palette.mode === "dark";
  const borderColor = isDarkMode ? `${keyColor}40` : `${keyColor}30`;

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
              placeholder="01012345678"
              value={phoneNumber}
              onChange={handlePhoneInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              margin="normal"
              variant="outlined"
              error={phoneNumber !== "" && !isValidFormat}
              helperText={
                phoneNumber !== "" && !isValidFormat
                  ? "올바른 형식의 전화번호를 입력해주세요. (예: 01012345678)"
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

            <Button
              variant="contained"
              onClick={sendCode}
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
                "&.Mui-disabled": {
                  bgcolor:
                    theme.palette.mode === "dark" ? "#464646" : "#e0e0e0",
                  color: theme.palette.mode === "dark" ? "#8a8a8a" : "#a6a6a6",
                },
                transition: "all 0.3s",
              }}
            >
              {isSending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "인증 코드 발송"
              )}
            </Button>
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", textAlign: "center" }}
          >
            '-'를 제외한 휴대폰 번호를 입력해주세요.
          </Typography>
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
              다음 단계에서 인증 코드를 입력해주세요.
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
              다음 단계로
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

export default PhoneNumberField;
