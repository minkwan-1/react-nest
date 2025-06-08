import { useState, useEffect, useCallback } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import axios from "axios";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";

const PhoneNumberField = () => {
  const theme = useTheme();
  const keyColor = "#b8dae1";
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [, setUserInfo] = useAtom(realUserInfo);

  const handlePhoneNumberChange = useCallback(
    (phone: string) => {
      setPhoneNumber(phone);
      setUserInfo((prev) => (prev ? { ...prev, phoneNumber: phone } : null));
    },
    [setUserInfo]
  );

  const isValidPhoneNumber = (number: string) => {
    const trimmed = number.replace(/\s+/g, "");
    return trimmed;
  };

  const isValidFormat = phoneNumber ? isValidPhoneNumber(phoneNumber) : true;

  useEffect(() => {
    handlePhoneNumberChange(phoneNumber);
  }, [phoneNumber, handlePhoneNumberChange]);

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
      console.timeLog("전화번호를 입력해주세요.");
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      console.log("유효한 전화번호를 입력해주세요. (예: 01012345678)");
      return;
    }

    setIsSending(true);

    try {
      const response = await axios.post("http://localhost:3000/api/send-code", {
        toPhoneNumber: `+82${phoneNumber.trim()}`,
      });

      console.log("response 확인: ", response);
    } catch (error: unknown) {
      console.log("휴대전화번호 전송 인증 에러 확인: ", error);
    } finally {
      setIsSending(false);
    }
  };

  const debouncedSendCode = useCallback(debounce(sendCode, 300), [phoneNumber]);

  const isDarkMode = theme.palette.mode === "dark";
  const borderColor = isDarkMode ? `${keyColor}40` : `${keyColor}30`;

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
            onChange={(e) => setPhoneNumber(e.target.value)}
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
              "&.Mui-disabled": {
                bgcolor: theme.palette.mode === "dark" ? "#464646" : "#e0e0e0",
                color: theme.palette.mode === "dark" ? "#8a8a8a" : "#a6a6a6",
              },
              transition: "all 0.3s",
            }}
          >
            인증 코드 발송
          </Button>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", textAlign: "center" }}
        >
          국가 코드를 포함한 휴대폰 번호를 입력해주세요
        </Typography>
      </Paper>
    </motion.div>
  );
};

export default PhoneNumberField;
