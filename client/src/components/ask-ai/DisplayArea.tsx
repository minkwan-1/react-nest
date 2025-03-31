import { Box, Paper, useTheme, alpha } from "@mui/material";
import {
  WelcomeMessage,
  MessageLoading,
  UserAvatar,
  AIAvatar,
  ChatMessage,
} from "@components/ask-ai/index";

interface DisplayAreaProps {
  conversation: { type: string; content: string }[];
  loading: boolean;
}

const DisplayArea = ({ conversation, loading }: DisplayAreaProps) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      className="conversation-container"
      sx={{
        flexGrow: 1,
        overflow: "auto",
        mb: 3,
        borderRadius: 3,
        bgcolor: alpha(theme.palette.background.paper, 0.8),
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        p: 2,
      }}
    >
      {conversation.length === 0 ? (
        <WelcomeMessage />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {conversation.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                alignSelf: message.type === "user" ? "flex-end" : "flex-start",
                maxWidth: "80%",
              }}
            >
              {message.type === "ai" && <AIAvatar />}
              <ChatMessage message={message} />
              {message.type === "user" && <UserAvatar />}
            </Box>
          ))}
          {loading && <MessageLoading />}
        </Box>
      )}
    </Paper>
  );
};

export default DisplayArea;
