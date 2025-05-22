import React from "react";
import {
  Button,
  Paper,
  Typography,
  Box,
  useTheme,
  CircularProgress,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg"; // 회원가입 아이콘
import { useNavigate } from "react-router-dom";

interface SignupButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
}

const SignupButton: React.FC<SignupButtonProps> = ({
  onClick,
  isLoading = false,
}) => {
  const theme = useTheme();
  const keyColor = "#b8dae1";
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      if (onClick) {
        await onClick();
      }

      // onClick 함수가 성공적으로 완료되면 페이지 이동
      // 에러가 발생하면 onClick 내부에서 처리하고 여기까지 오지 않음
      navigate("/sign-in");
    } catch (error) {
      console.error("Signup error:", error);
      // 에러는 onClick 내부에서 처리되므로 여기서 추가 처리 필요 없음
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
        disabled={isLoading}
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
