import React from "react";
import { Button, Paper, Typography, Box, useTheme } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg"; // 회원가입 아이콘
import { useNavigate } from "react-router-dom";

interface SignupButtonProps {
  onClick?: () => void;
}

const SignupButton: React.FC<SignupButtonProps> = ({ onClick }) => {
  const theme = useTheme();
  const keyColor = "#03cb84";
  const navigate = useNavigate();

  const handleSignup = () => {
    try {
      if (onClick) onClick();

      navigate("/sign-in");
    } catch (error) {
      console.log(error);
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
        endIcon={<HowToRegIcon />}
      >
        회원가입 완료하기
      </Button>
    </Paper>
  );
};

export default SignupButton;
