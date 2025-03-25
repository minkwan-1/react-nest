import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import { useAtom } from "jotai";
import { signupUserInfo } from "@atom/auth";
const UserInfoField = () => {
  const [userInfo] = useAtom(signupUserInfo);
  return (
    <Box
      sx={{
        mb: 3,
        p: 2,
        bgcolor: "rgba(0, 0, 0, 0.02)",
        borderRadius: 1,
      }}
    >
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        회원 정보
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        value={userInfo?.name || ""}
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="이름"
        size="small"
      />

      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        value={userInfo?.email || ""}
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="이메일"
        size="small"
      />
    </Box>
  );
};

export default UserInfoField;
