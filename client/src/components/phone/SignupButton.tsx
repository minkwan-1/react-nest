import React, { useState } from "react";
import {
  Button,
  Paper,
  Typography,
  Box,
  useTheme,
  CircularProgress,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";

interface SignupButtonProps {
  onClick?: () => Promise<boolean> | boolean | Promise<void> | void;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
  disabled?: boolean;
}

// signup button disabled부터 작업

const SignupButton: React.FC<SignupButtonProps> = ({
  onClick,
  onSuccess,
  onError,
  disabled = false,
}) => {
  const theme = useTheme();
  const keyColor = "#b8dae1";
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (disabled) return;

    setIsLoading(true);

    try {
      let result: boolean | void = true;

      if (onClick) {
        result = await onClick();
      }

      // void인 경우 성공으로 간주, false인 경우만 실패로 처리
      if (result !== false) {
        // 성공 시 축하 메시지 표시
        if (onSuccess) {
          onSuccess(
            "회원가입이 완료되었습니다!\n\n풀림(Pullim)에 오신 것을 환영합니다. 이제 자유롭게 질문하고, 답변하며 함께 성장해 보세요!\n잠시 후 로그인 페이지로 이동합니다."
          );
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (onError) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "회원가입 중 오류가 발생했습니다.";
        onError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 4,
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor:
          theme.palette.mode === "dark" ? `${keyColor}40` : `${keyColor}30`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{ color: keyColor }}
        >
          회원가입 완료
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          모든 인증이 완료되었습니다. 아래 버튼을 클릭하여 회원가입을
          완료하세요.
        </Typography>
      </Box>

      <Button
        variant="contained"
        onClick={handleSignup}
        fullWidth
        disabled={isLoading || disabled}
        sx={{
          mt: 2,
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
        endIcon={isLoading ? undefined : <HowToRegIcon />}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "회원가입 완료하기"
        )}
      </Button>
    </Paper>
  );
};

export default SignupButton;
