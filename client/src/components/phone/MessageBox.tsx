// components/phone/MessageBox.tsx
import { Box, Alert, AlertTitle } from "@mui/material";

interface MessageBoxProps {
  message: string;
  messageType: "info" | "success" | "error";
}

const MessageBox = ({ message, messageType }: MessageBoxProps) => {
  if (!message) return null;

  const titles = {
    info: "안내",
    success: "성공",
    error: "오류",
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Alert severity={messageType}>
        <AlertTitle>{titles[messageType]}</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};

export default MessageBox;
