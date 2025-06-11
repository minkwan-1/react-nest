// 필요한 훅과 라이브러리 import
import { useState, useEffect, useCallback } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  Typography,
  Paper,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import axios from "axios";
import { motion } from "framer-motion";
import type { signupUserInfo } from "@atom/auth";
import { SetStateAction } from "jotai";

type PhoneNumberFieldProps = {
  onNext: () => void;
  userInfo: signupUserInfo | null;
  setUserInfo: (userInfo: SetStateAction<signupUserInfo | null>) => void;
};

const PhoneNumberField = ({
  onNext,
  userInfo,
  setUserInfo,
}: PhoneNumberFieldProps) => {
  const theme = useTheme();
  const keyColor = "#b8dae1";
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  // 모달 상태를 객체로 통합 관리
  const [modal, setModal] = useState({
    open: false,
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });

  // 컴포넌트 마운트 시 userInfo에서 전화번호 불러오기
  useEffect(() => {
    if (userInfo?.phoneNumber) {
      setPhoneNumber(userInfo.phoneNumber);
    }
  }, [userInfo?.phoneNumber]);

  // 전화번호 입력 시 상태와 userInfo 업데이트
  const handlePhoneNumberChange = useCallback(
    (phone: string) => {
      setPhoneNumber(phone);

      // userInfo 업데이트
      setUserInfo((prev) => {
        if (prev) {
          return { ...prev, phoneNumber: phone };
        } else {
          // prev가 null일 경우 최소한의 정보로 새 객체 생성
          return {
            id: "",
            email: "",
            name: "",
            phoneNumber: phone,
            createdAt: "",
            updatedAt: "",
            provider: "",
          };
        }
      });
    },
    [setUserInfo]
  );

  // 전화번호 유효성 검사 함수 (010으로 시작하고 8자리 숫자 총 11자리)
  const isValidPhoneNumber = (number: string) => {
    const trimmed = number.replace(/\s+/g, "");
    const phoneRegex = /^010\d{8}$/;
    return phoneRegex.test(trimmed);
  };

  const isValidFormat = phoneNumber ? isValidPhoneNumber(phoneNumber) : true;

  // phoneNumber가 바뀔 때마다 userInfo 동기화
  useEffect(() => {
    handlePhoneNumberChange(phoneNumber);
  }, [phoneNumber, handlePhoneNumberChange]);

  // 디바운스 유틸 함수 (지연된 실행)
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

  // 인증 코드 전송 함수 (수정됨)
  const sendCode = async () => {
    // 전화번호 비었는지 확인
    if (!phoneNumber.trim()) {
      console.log("전화번호를 입력해주세요.");
      return;
    }

    // 형식 확인
    if (!isValidPhoneNumber(phoneNumber)) {
      console.log("유효한 전화번호를 입력해주세요. (예: 01012345678)");
      return;
    }

    setIsSending(true);

    try {
      // 백엔드 API로 POST 요청 (국가코드 +82 붙이기)
      const response = await axios.post("http://localhost:3000/api/send-code", {
        toPhoneNumber: `+82${phoneNumber.trim()}`,
      });

      console.log("인증 코드 전송 성공:", response);

      // userInfo에 전화번호 저장 재확인
      setUserInfo((prev) => {
        if (prev) {
          return { ...prev, phoneNumber: phoneNumber };
        } else {
          return {
            id: "",
            email: "",
            name: "",
            phoneNumber: phoneNumber,
            createdAt: "",
            updatedAt: "",
            provider: "",
          };
        }
      });

      // next() 함수 대신 성공 모달을 표시
      setModal({
        open: true,
        type: "success",
        title: "인증 코드 요청 완료",
        message: `${phoneNumber}로 인증 코드가 전송되었습니다.`,
      });
    } catch (error: unknown) {
      console.log("휴대전화번호 전송 인증 에러:", error);

      // 실패 모달을 표시
      setModal({
        open: true,
        type: "error",
        title: "인증 코드 전송 실패",
        message: "인증 코드 전송에 실패했습니다. 다시 시도해주세요.",
      });
    } finally {
      setIsSending(false);
    }
  };

  // 모달 내 다음 단계 버튼 핸들러
  const handleNextStep = () => {
    setModal({ ...modal, open: false });
    onNext();
  };

  // 디바운스된 sendCode 함수
  const debouncedSendCode = useCallback(debounce(sendCode, 300), [
    phoneNumber,
    setModal,
    setUserInfo,
  ]);

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
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {/* 제목 */}
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{ mb: 2, color: keyColor }}
          >
            휴대폰 번호 인증
          </Typography>

          {/* 입력 필드 및 버튼 */}
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

            {/* 인증 코드 발송 버튼 */}
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
                  bgcolor:
                    theme.palette.mode === "dark" ? "#464646" : "#e0e0e0",
                  color: theme.palette.mode === "dark" ? "#8a8a8a" : "#a6a6a6",
                },
                transition: "all 0.3s",
              }}
            >
              {isSending ? "전송 중..." : "인증 코드 발송"}
            </Button>
          </Box>

          {/* 안내 문구 */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", textAlign: "center" }}
          >
            국가 코드를 포함한 휴대폰 번호를 입력해주세요
          </Typography>
        </Paper>
      </motion.div>

      {/* 성공 모달 */}
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
