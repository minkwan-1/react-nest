import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
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
import type { signupUserInfo } from "@atom/auth";
import { SetStateAction } from "jotai";
import { useMutation } from "@tanstack/react-query";
import { requestVerificationCodeAPI } from "./api/requestVerificationCodeAPI";

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
  const navigate = useNavigate();
  const theme = useTheme();
  const keyColor = "#b8dae1";

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [modal, setModal] = useState({
    open: false,
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });

  const [authRedirectModal, setAuthRedirectModal] = useState(false);

  // 컴포넌트 마운트 시 유저 정보가 없으면 '/start' 경로로 리다이렉트
  useEffect(() => {
    if (!userInfo) {
      setAuthRedirectModal(true);
      // navigate("/start");
    }
  }, [userInfo, navigate]);

  const handleRedirectConfirm = () => {
    setAuthRedirectModal(false);
    navigate("/start");
  };

  // 인증 코드 요청을 위한 React Query useMutation hook
  const { mutate: requestCode, isPending: isSending } = useMutation({
    mutationFn: requestVerificationCodeAPI,
    onSuccess: (data) => {
      setModal({
        open: true,
        type: "success",
        title: "인증 코드 요청 완료",
        message: `${phoneNumber}로 인증 코드가 전송되었습니다.`,
      });
      console.log("인증 코드 전송 성공:", data);
    },
    onError: (error) => {
      setModal({
        open: true,
        type: "error",
        title: "인증 코드 전송 실패",
        message: "인증 코드 전송에 실패했습니다. 다시 시도해주세요.",
      });
      console.log("휴대전화번호 전송 인증 에러:", error);
    },
  });

  // 부모로부터 받은 유저 정보에 휴대폰 번호가 있다면 상태에 설정
  useEffect(() => {
    if (userInfo?.phoneNumber) {
      setPhoneNumber(userInfo.phoneNumber);
    }
  }, [userInfo?.phoneNumber]);

  // 휴대폰 번호 변경 시, 로컬 및 전역 상태를 업데이트하는 함수
  const handlePhoneNumberChange = useCallback(
    (phone: string) => {
      setPhoneNumber(phone);
      setUserInfo((prev) => {
        if (prev) {
          return { ...prev, phoneNumber: phone };
        } else {
          // userInfo가 없는 경우는 이미 리다이렉트되므로, 사실상 이 코드는 실행되지 않음
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

  // 휴대폰 번호 유효성 검사 함수 (010으로 시작하는 11자리)
  const isValidPhoneNumber = (number: string) => {
    const trimmed = number.replace(/\s+/g, "");
    const phoneRegex = /^010\d{8}$/;
    return phoneRegex.test(trimmed);
  };

  // 현재 입력된 휴대폰 번호의 유효성 여부
  const isValidFormat = phoneNumber ? isValidPhoneNumber(phoneNumber) : true;

  // phoneNumber 상태가 변경될 때마다 전역 상태도 함께 업데이트
  useEffect(() => {
    handlePhoneNumberChange(phoneNumber);
  }, [phoneNumber, handlePhoneNumberChange]);

  // 연속적인 함수 호출을 방지하는 디바운스 유틸리티 함수
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

  // 인증 코드 발송 API를 호출하는 함수
  const sendCode = () => {
    if (!phoneNumber.trim() || !isValidPhoneNumber(phoneNumber)) {
      console.log("유효한 전화번호를 입력해주세요.");
      return;
    }
    setUserInfo(
      (prev) =>
        ({
          ...(prev ?? {}),
          phoneNumber: phoneNumber.trim(),
        } as signupUserInfo)
    );

    requestCode(phoneNumber);
  };

  // 모달의 '다음 단계로' 버튼 클릭 시 실행되는 핸들러
  const handleNextStep = () => {
    setModal({ ...modal, open: false });
    onNext();
  };

  // 디바운스가 적용된 인증 코드 발송 함수
  const debouncedSendCode = useCallback(debounce(sendCode, 300), [
    phoneNumber,
    setUserInfo,
  ]);

  const isDarkMode = theme.palette.mode === "dark"; // 다크모드 여부 확인
  const borderColor = isDarkMode ? `${keyColor}40` : `${keyColor}30`; // 다크모드에 따른 테두리 색상 설정

  // 유저 정보가 없을 경우 리다이렉트가 처리되는 동안 렌더링하지 않음
  if (!userInfo) {
    return null;
  }

  return (
    <>
      {/* 화면에 부드럽게 나타나는 애니메이션 효과를 위한 컨테이너 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* 휴대폰 번호 입력 UI를 감싸는 Paper 컴포넌트 */}
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

          {/* 입력 필드와 버튼을 포함하는 영역 */}
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

            {/* 인증 코드 발송 요청 버튼 */}
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
              {isSending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "인증 코드 발송"
              )}
            </Button>
          </Box>

          {/* 하단 안내 문구 */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", textAlign: "center" }}
          >
            '-'를 제외한 휴대폰 번호를 입력해주세요.
          </Typography>
        </Paper>
      </motion.div>

      {/* 인증 요청 결과(성공/실패)를 알려주는 모달창 */}
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

      {/* 유저 정보 없음에 대한 모달 */}
      <Dialog
        open={authRedirectModal}
        onClose={handleRedirectConfirm}
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 3,
            minWidth: 320,
            textAlign: "center",
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.2)",
            border: "1px solid #b8dae130",
          },
        }}
      >
        <DialogTitle sx={{ p: 0, mb: 1 }}>
          <InfoOutlinedIcon sx={{ fontSize: 52, color: "#b8dae1" }} />
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
            알림
          </Typography>
          <Typography color="text.secondary">
            사용자 정보가 없어요. 시작 페이지로 이동할게요.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", p: 0, pt: 3 }}>
          <Button
            onClick={handleRedirectConfirm}
            // autoFocus
            variant="contained"
            sx={{
              px: 5,
              py: 1.2,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              bgcolor: "#b8dae1",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#a8c9d0",
                boxShadow: "none",
                transform: "translateY(-1px)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PhoneNumberField;
