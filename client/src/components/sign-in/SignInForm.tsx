import { Box, Typography, TextField, Button, alpha } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
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
            bgcolor: alpha("#f7f9fc", 0.8),
            overflow: "hidden",
            "& fieldset": {
              borderColor: alpha("#000", 0.08),
            },
            "&:hover fieldset": {
              borderColor: alpha("#000", 0.15) + "!important",
            },
            "&.Mui-focused fieldset": {
              borderWidth: "1px",
              boxShadow: `0 0 0 4px ${alpha("#6366F1", 0.08)}`,
            },
          },
        }}
        InputLabelProps={{
          sx: { ml: 1 },
        }}
        sx={{
          "& label.Mui-focused": {
            color: "#6366F1",
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
            bgcolor: alpha("#f7f9fc", 0.8),
            overflow: "hidden",
            "& fieldset": {
              borderColor: alpha("#000", 0.08),
            },
            "&:hover fieldset": {
              borderColor: alpha("#000", 0.15) + "!important",
            },
            "&.Mui-focused fieldset": {
              borderWidth: "1px",
              boxShadow: `0 0 0 4px ${alpha("#6366F1", 0.08)}`,
            },
          },
        }}
        InputLabelProps={{
          sx: { ml: 1 },
        }}
        sx={{
          "& label.Mui-focused": {
            color: "#6366F1",
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
          mt: 1,
          py: 1.2,
          borderRadius: 50,
          bgcolor: "#6366F1",
          fontWeight: 600,
          boxShadow: "0 4px 14px rgba(99,102,241,0.4)",
          transition: "all 0.2s",
          textTransform: "none",
          "&:hover": {
            bgcolor: "#4F46E5",
            boxShadow: "0 6px 20px rgba(99,102,241,0.6)",
          },
        }}
      >
        로그인
      </Button>

      <Typography
        variant="body2"
        align="center"
        sx={{ mt: 1, color: alpha("#000", 0.6), fontWeight: 300 }}
      >
        아직 계정이 없으신가요?{" "}
        <Box
          onClick={() => navigate("/sign-up")}
          component="span"
          sx={{ color: "#6366F1", fontWeight: 500, cursor: "pointer" }}
        >
          회원가입
        </Box>
      </Typography>
    </Box>
  );
};

export default SignInForm;
