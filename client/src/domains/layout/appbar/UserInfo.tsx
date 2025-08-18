import { Box, Typography, Button } from "@mui/material";

interface UserInfoProps {
  nickname: string;
  onLogout: () => void;
}

function UserInfo({ nickname, onLogout }: UserInfoProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        sx={{ marginRight: "16px", fontWeight: "bold" }}
        variant="body1"
      >
        {nickname}님
      </Typography>

      <Button
        variant="outlined"
        size="small"
        onClick={onLogout}
        sx={{
          marginRight: "16px",
          color: "#b8dae1",
          borderColor: "#b8dae1",
        }}
      >
        로그아웃
      </Button>
    </Box>
  );
}

export default UserInfo;
