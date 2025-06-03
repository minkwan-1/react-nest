import React from "react";
import {
  Button,
  Paper,
  Typography,
  Box,
  useTheme,
  CircularProgress,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useNavigate } from "react-router-dom";

interface SignupButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const SignupButton: React.FC<SignupButtonProps> = ({
  onClick,
  isLoading = false,
  disabled = false,
}) => {
  const theme = useTheme();
  const keyColor = "#b8dae1";
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      if (onClick) {
        await onClick();
      }
      navigate("/sign-in");
    } catch (error) {
      console.error("Signup error:", error);
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
