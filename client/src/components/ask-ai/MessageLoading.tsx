import {
  Box,
  Avatar,
  Card,
  alpha,
  CircularProgress,
  useTheme,
} from "@mui/material";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
const MessageLoading = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        alignSelf: "flex-start",
        maxWidth: "80%",
      }}
    >
      <Avatar
        sx={{
          bgcolor: "#03cb84",
          width: 38,
          height: 38,
        }}
      >
        <SmartToyOutlinedIcon fontSize="small" />
      </Avatar>

      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          bgcolor: alpha(theme.palette.background.default, 0.7),
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          p: 2,
        }}
      >
        <CircularProgress size={24} sx={{ color: "#03cb84" }} />
      </Card>
    </Box>
  );
};

export default MessageLoading;
