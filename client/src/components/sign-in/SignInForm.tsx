import { Box, Typography, TextField, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
    >
      <TextField
        fullWidth
        label="이메일"
        variant="outlined"
        size="small"
        InputProps={{
          sx: {
            borderRadius: 50,
            ...theme.applyStyles("dark", {
              "& fieldset": {
                borderColor: "#ffffff25",
              },
              color: "#f0f0f0",
              caretColor: "#f0f0f0",
            }),
          },
        }}
        InputLabelProps={{
          sx: {
            borderRadius: 50,
            ...theme.applyStyles("dark", {
              color: "#b0b0b0",
            }),
          },
        }}
      />

      <TextField
        fullWidth
        label="비밀번호"
        variant="outlined"
        size="small"
        InputProps={{
          sx: {
            borderRadius: 50,
            ...theme.applyStyles("dark", {
              "& fieldset": {
                borderColor: "#ffffff25",
              },
              color: "#f0f0f0",
              caretColor: "#f0f0f0",
            }),
          },
        }}
        InputLabelProps={{
          sx: {
            borderRadius: 50,
            ...theme.applyStyles("dark", {
              color: "#b0b0b0",
            }),
          },
        }}
      />

      <Typography
        variant="body2"
        align="right"
        sx={{
          mt: -1,
          color: "#6366F1",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        비밀번호를 잊으셨나요?
      </Typography>

      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 1.5,
          py: 1.2,
          borderRadius: 50,
          bgcolor: "#6366F1",
          fontWeight: 600,
          ...theme.applyStyles("light", {
            boxShadow: "0 4px 14px rgba(99,102,241,0.4)",
            color: "white",
            "&:hover": {
              bgcolor: "#5153cc",
              boxShadow: "0 6px 16px rgba(99,102,241,0.5)",
            },
          }),
          ...theme.applyStyles("dark", {
            color: "white",
            boxShadow: "0 4px 14px rgba(99,102,241,0.2)",
            "&:hover": {
              bgcolor: "#5153cc",
              boxShadow: "0 6px 16px rgba(99,102,241,0.3)",
            },
          }),
        }}
      >
        로그인
      </Button>

      <Typography
        variant="body2"
        align="center"
        sx={{
          mt: 1,
          fontWeight: 300,
          ...theme.applyStyles("light", {
            color: "#00000099",
          }),
          ...theme.applyStyles("dark", {
            color: "#cccccc",
          }),
        }}
      >
        아직 계정이 없으신가요?{" "}
        <Box
          onClick={() => navigate("/sign-up")}
          component="span"
          sx={{
            fontWeight: 500,
            cursor: "pointer",
            ...theme.applyStyles("light", {
              color: "#6366F1",
            }),
            ...theme.applyStyles("dark", {
              color: "#8f91f8",
            }),
          }}
        >
          회원가입
        </Box>
      </Typography>
    </Box>
  );
};

export default SignInForm;
