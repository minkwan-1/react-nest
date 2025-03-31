import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { alpha, useTheme } from "@mui/material/styles";

interface Message {
  type: string;
  content: string;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        bgcolor:
          message.type === "user"
            ? "#03cb84"
            : alpha(theme.palette.background.default, 0.7),
        overflow: "visible",
        border:
          message.type === "ai"
            ? `1px solid ${alpha(theme.palette.divider, 0.1)}`
            : "none",
        maxWidth: "100%",
      }}
    >
      <CardContent sx={{ py: 1.5, px: 2, "&:last-child": { pb: 1.5 } }}>
        {message.type === "user" ? (
          <Typography
            sx={{
              fontSize: "15px",
              lineHeight: 1.6,
              color: "white",
              whiteSpace: "pre-wrap",
            }}
          >
            {message.content}
          </Typography>
        ) : (
          <Box
            sx={{
              fontSize: "15px",
              lineHeight: 1.6,
              color: theme.palette.text.primary,

              "& pre": {
                backgroundColor: alpha(theme.palette.common.black, 0.04),
                borderRadius: 1,
                padding: 1.5,
                overflowX: "auto",
                fontSize: "14px",
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              },
              "& code": {
                backgroundColor: alpha(theme.palette.common.black, 0.04),
                padding: "2px 4px",
                borderRadius: 1,
                fontSize: "14px",
                fontFamily: "monospace",
              },
              "& h1, & h2, & h3, & h4, & h5, & h6": {
                mt: 2,
                mb: 1,
                fontWeight: 600,
                lineHeight: 1.3,
              },
              "& h1": { fontSize: "1.5rem" },
              "& h2": { fontSize: "1.3rem" },
              "& h3": { fontSize: "1.2rem" },
              "& p": { my: 1 },
              "& ul, & ol": {
                pl: 3,
                mb: 1,
              },
              "& li": {
                mb: 0.5,
              },
              "& blockquote": {
                borderLeft: `4px solid ${alpha("#03cb84", 0.5)}`,
                pl: 2,
                py: 0.5,
                my: 1,
                color: alpha(theme.palette.text.primary, 0.7),
                backgroundColor: alpha(theme.palette.divider, 0.05),
                borderRadius: 1,
              },
              "& img": {
                maxWidth: "100%",
                borderRadius: 1,
              },
              "& table": {
                borderCollapse: "collapse",
                width: "100%",
                mb: 2,
              },
              "& th, & td": {
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                padding: "8px 12px",
                textAlign: "left",
              },
              "& th": {
                backgroundColor: alpha(theme.palette.divider, 0.1),
                fontWeight: 600,
              },
              "& a": {
                color: "#03cb84",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              },
              "& hr": {
                border: "none",
                height: "1px",
                backgroundColor: alpha(theme.palette.divider, 0.2),
                my: 2,
              },
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {message.content}
            </ReactMarkdown>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatMessage;
