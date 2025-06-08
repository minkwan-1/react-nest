import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  // CircularProgress,
  InputAdornment,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
// import SendIcon from "@mui/icons-material/Send";
// import axios from "axios";
import { motion } from "framer-motion";

// interface PhoneNumberFieldProps {
//   onSuccess: (message: string) => void;
//   onError: (message: string) => void;
//   onWarning?: (message: string) => void; // warning 콜백 추가
//   onPhoneNumberChange: (phoneNumber: string) => void;
//   onCodeSent: () => void;
//   onExistingUser: () => void;
// }

// {
//   onSuccess,
//   onError,
//   onWarning,
//   onPhoneNumberChange,
//   onCodeSent,
//   onExistingUser,
// }: PhoneNumberFieldProps

const PhoneNumberField = () => {
  const theme = useTheme();
  const keyColor = "#b8dae1";
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [isSending, setIsSending] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isValidPhoneNumber = (number: string) => {
    const trimmed = number.replace(/\s+/g, "");
    // return /^\+\d{10,15}$/.test(trimmed);
    return trimmed;
  };

  const isValidFormat = phoneNumber ? isValidPhoneNumber(phoneNumber) : true;

  // useEffect(() => {
  //   onPhoneNumberChange(phoneNumber);
  // }, [phoneNumber, onPhoneNumberChange]);

  // const debounce = <T extends unknown[]>(
  //   func: (...args: T) => void,
  //   delay: number
  // ) => {
  //   let timer: NodeJS.Timeout;
  //   return (...args: T) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => func(...args), delay);
  //   };
  // };

  // const sendCode = async () => {
  //   // phone number validation
  //   if (!phoneNumber.trim()) {
  //     onError("전화번호를 입력해주세요.");
  //     return;
  //   }

  //   if (!isValidPhoneNumber(phoneNumber)) {
  //     onError("유효한 전화번호를 입력해주세요. (예: 01012345678)");
  //     return;
  //   }

  //   setIsSending(true);

  //   try {
  //     const response = await axios.post("http://localhost:3000/api/send-code", {
  //       toPhoneNumber: `+82${phoneNumber.trim()}`,
  //     });

  //     // 응답에서 기존 유저 여부 확인
  //     if (response.data.isExistingUser) {
  //       // 기존 유저일 때 warning 메시지 표시
  //       if (onWarning) {
  //         onWarning(
  //           "이미 가입된 휴대폰 번호입니다. 로그인 페이지로 이동합니다."
  //         );
  //       }
  //       onExistingUser();
  //       return;
  //     }

  //     onSuccess(response.data.message || "인증 코드가 발송되었습니다!");
  //     onCodeSent();
  //   } catch (error: unknown) {
  //     if (axios.isAxiosError(error)) {
  //       if (!error.response) {
  //         onError("네트워크 연결에 실패했습니다. 인터넷을 확인해주세요.");
  //       } else {
  //         // 409 상태코드는 이미 존재하는 유저를 의미
  //         if (error.response.status === 409) {
  //           // 기존 유저일 때 warning 메시지 표시
  //           if (onWarning) {
  //             onWarning(
  //               "이미 가입된 휴대폰 번호입니다. 로그인 페이지로 이동합니다."
  //             );
  //           }
  //           onExistingUser();
  //           return;
  //         }

  //         const errorMessage =
  //           error.response.data?.message || "인증 코드 발송에 실패했습니다.";

  //         onError(errorMessage);
  //       }
  //     } else {
  //       onError("알 수 없는 오류가 발생했습니다.");
  //     }
  //   } finally {
  //     setIsSending(false);
  //   }
  // };

  // const debouncedSendCode = useCallback(debounce(sendCode, 300), [phoneNumber]);

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
            // onClick={debouncedSendCode}
            // disabled={isSending || !phoneNumber.trim() || !isValidFormat}
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
            // endIcon={!isSending && <SendIcon />}
          >
            {/* {isSending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "인증 코드 발송"
            )} */}
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
