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
      }}
    >
      <SmartToyOutlinedIcon sx={{ fontSize: 64, mb: 2, color: "#c5a3d5" }} />
      <Typography variant="h6" align="center" sx={{ mb: 1, fontWeight: 600 }}>
        AI에게 추가 질문을 해보세요
      </Typography>
      <Typography align="center">
        답변 내용을 확인하고, 궁금한 점을 AI에게 물어보세요.
      </Typography>
    </Box>
  );
};

export default WelcomeMessage;
