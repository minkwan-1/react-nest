import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
    >
      <TextField
        fullWidth
        label="이름"
        variant="outlined"
        size="small"
        InputProps={{
          sx: { borderRadius: 50 },
        }}
        InputLabelProps={{
          sx: { borderRadius: 50 },
        }}
      />
      <TextField
        fullWidth
        label="이메일"
        variant="outlined"
        size="small"
        InputProps={{
          sx: { borderRadius: 50 },
        }}
        InputLabelProps={{
          sx: { borderRadius: 50 },
        }}
      />
      <TextField
        fullWidth
        label="비밀번호"
        variant="outlined"
        size="small"
        InputProps={{
          sx: { borderRadius: 50 },
        }}
        InputLabelProps={{
          sx: { borderRadius: 50 },
        }}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 1.5,
          py: 1.2,
          borderRadius: 50,
          bgcolor: "#6366F1",
          fontWeight: 600,
          boxShadow: "0 4px 14px rgba(99,102,241,0.4)",
        }}
      >
        가입하기
      </Button>

      <Typography
        variant="body2"
        align="center"
        sx={{ mt: 1, color: "#00000099", fontWeight: 300 }}
      >
        이미 계정이 있으신가요?{" "}
        <Box
          onClick={() => navigate("/sign-in")}
          component="span"
          sx={{ color: "#6366F1", fontWeight: 500, cursor: "pointer" }}
        >
          로그인
        </Box>
      </Typography>
    </Box>
  );
};

export default SignUpForm;
