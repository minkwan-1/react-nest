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
          color: "#03cb84",
          borderColor: "#03cb84",
        }}
      >
        로그아웃
      </Button>
    </Box>
  );
}

export default UserInfo;
