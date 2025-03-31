import { Box, Typography, alpha, useTheme } from "@mui/material";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";

const WelcomeMessage = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: alpha(theme.palette.text.secondary, 0.7),
        p: 3,
      }}
    >
      <SmartToyOutlinedIcon sx={{ fontSize: 64, mb: 2, color: "#03cb84" }} />
      <Typography variant="h6" align="center" sx={{ mb: 1, fontWeight: 600 }}>
        AI 어시스턴트에게 무엇이든 물어보세요
      </Typography>
      <Typography align="center" sx={{ maxWidth: "500px" }}>
        질문, 아이디어, 문제 해결 등 다양한 주제에 대해 대화를 시작해보세요.
      </Typography>
    </Box>
  );
};

export default WelcomeMessage;
