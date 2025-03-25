import { Box, Typography } from "@mui/material";

interface MessageBoxProps {
  message: string;
  messageType: "error" | "success" | "info";
}

const MessageBox = ({ message, messageType }: MessageBoxProps) => {
  if (!message) return null;

  const colors = {
    error: "rgba(255, 0, 0, 0.05)",
    success: "rgba(0, 255, 0, 0.05)",
    info: "rgba(0, 0, 255, 0.05)",
  };

  return (
    <Box mt={3} p={2} bgcolor={colors[messageType]} borderRadius={1}>
      <Typography color={`${messageType}.main`}>{message}</Typography>
    </Box>
  );
};

export default MessageBox;
