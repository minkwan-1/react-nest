import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Paper,
  Avatar,
  IconButton,
  useTheme,
  alpha,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { PageContainer, ComponentWrapper } from "../components/layout/common";
import SendIcon from "@mui/icons-material/Send";
import RefreshIcon from "@mui/icons-material/Refresh";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

const AskAIPage = () => {
  const theme = useTheme();
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [conversation, setConversation] = useState<
    Array<{ type: "user" | "ai"; content: string }>
  >([]);
  console.log(response);
  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    // Add user message to conversation
    const userMessage = prompt.trim();
    setConversation([...conversation, { type: "user", content: userMessage }]);
    setPrompt("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/ask-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      if (!res.ok) {
        throw new Error("서버 오류가 발생했습니다");
      }

      const data = await res.json();

      // Save the raw response
      setResponse(data.result);

      // Add AI response to conversation
      // The ReactMarkdown component will handle the rendering
      setConversation((prev) => [
        ...prev,
        { type: "ai", content: data.result },
      ]);

      // Scroll to bottom of conversation
      setTimeout(() => {
        const conversationContainer = document.querySelector(
          ".conversation-container"
        );
        if (conversationContainer) {
          conversationContainer.scrollTop = conversationContainer.scrollHeight;
        }
      }, 100);
    } catch (err: unknown) {
      console.error(err);
      setError("AI 응답 가져오기에 실패했습니다. 나중에 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleReset = () => {
    setPrompt("");
    setResponse("");
    setConversation([]);
    setError("");
  };

  return (
    <PageContainer>
      <ComponentWrapper
        sx={{
          padding: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* Add this CSS to the page for code syntax highlighting */}
        <Box
          component="style"
          dangerouslySetInnerHTML={{
            __html: `
              .hljs {
                background: ${alpha(theme.palette.common.black, 0.03)};
                border-radius: 8px;
              }
              .hljs-comment, .hljs-quote {
                color: #6a8759;
                font-style: italic;
              }
              .hljs-keyword, .hljs-selector-tag {
                color: #cc7832;
              }
              .hljs-string, .hljs-attribute, .hljs-addition {
                color: #6a8759;
              }
              .hljs-title, .hljs-section {
                color: #ffc66d;
              }
              .hljs-type, .hljs-name, .hljs-selector-id, .hljs-selector-class {
                color: #e8bf6a;
              }
              .hljs-variable, .hljs-template-variable {
                color: #9876aa;
              }
              .hljs-number {
                color: #6897bb;
              }
            `,
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 3,
          }}
        >
          <LightbulbOutlinedIcon
            sx={{
              color: "#03cb84",
              fontSize: 40,
            }}
          />
          <Typography
            sx={{
              color: theme.palette.text.primary,
              fontSize: { xs: "28px", md: "36px" },
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
          >
            AI에게 물어보세요
          </Typography>
        </Box>

        {/* Conversation Display Area */}
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
              <SmartToyOutlinedIcon
                sx={{ fontSize: 64, mb: 2, color: "#03cb84" }}
              />
              <Typography
                variant="h6"
                align="center"
                sx={{ mb: 1, fontWeight: 600 }}
              >
                AI 어시스턴트에게 무엇이든 물어보세요
              </Typography>
              <Typography align="center" sx={{ maxWidth: "500px" }}>
                질문, 아이디어, 문제 해결 등 다양한 주제에 대해 대화를
                시작해보세요.
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {conversation.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    alignSelf:
                      message.type === "user" ? "flex-end" : "flex-start",
                    maxWidth: "80%",
                  }}
                >
                  {message.type === "ai" && (
                    <Avatar
                      sx={{
                        bgcolor: "#03cb84",
                        width: 38,
                        height: 38,
                      }}
                    >
                      <SmartToyOutlinedIcon fontSize="small" />
                    </Avatar>
                  )}

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
                    <CardContent
                      sx={{ py: 1.5, px: 2, "&:last-child": { pb: 1.5 } }}
                    >
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
                              backgroundColor: alpha(
                                theme.palette.common.black,
                                0.04
                              ),
                              borderRadius: 1,
                              padding: 1.5,
                              overflowX: "auto",
                              fontSize: "14px",
                              border: `1px solid ${alpha(
                                theme.palette.divider,
                                0.1
                              )}`,
                            },
                            "& code": {
                              backgroundColor: alpha(
                                theme.palette.common.black,
                                0.04
                              ),
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
                              backgroundColor: alpha(
                                theme.palette.divider,
                                0.05
                              ),
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
                              border: `1px solid ${alpha(
                                theme.palette.divider,
                                0.2
                              )}`,
                              padding: "8px 12px",
                              textAlign: "left",
                            },
                            "& th": {
                              backgroundColor: alpha(
                                theme.palette.divider,
                                0.1
                              ),
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
                              backgroundColor: alpha(
                                theme.palette.divider,
                                0.2
                              ),
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

                  {message.type === "user" && (
                    <Avatar
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        width: 38,
                        height: 38,
                      }}
                    >
                      <PersonOutlineOutlinedIcon fontSize="small" />
                    </Avatar>
                  )}
                </Box>
              ))}

              {loading && (
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
              )}
            </Box>
          )}
        </Paper>

        {error && (
          <Card
            sx={{
              mb: 3,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.error.main, 0.1),
            }}
          >
            <CardContent sx={{ py: 1.5, px: 2, "&:last-child": { pb: 1.5 } }}>
              <Typography color="error" align="center">
                {error}
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Input Area */}
        <Box
          component={Paper}
          elevation={2}
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1,
            pl: 2,
            borderRadius: 4,
            bgcolor: alpha(theme.palette.background.paper, 0.9),
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <TextField
            variant="standard"
            placeholder="질문을 입력하세요"
            fullWidth
            multiline
            maxRows={4}
            InputProps={{
              disableUnderline: true,
            }}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "16px",
                py: 1,
              },
            }}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          <IconButton
            onClick={handleReset}
            sx={{ color: alpha(theme.palette.text.secondary, 0.7) }}
          >
            <RefreshIcon />
          </IconButton>

          <IconButton
            onClick={handleSubmit}
            disabled={loading || !prompt.trim()}
            sx={{
              bgcolor: "#03cb84",
              color: "white",
              "&:hover": {
                bgcolor: "#028a66",
              },
              "&.Mui-disabled": {
                bgcolor: alpha("#03cb84", 0.4),
                color: "white",
              },
              ml: 1,
              borderRadius: 2,
              width: 40,
              height: 40,
            }}
          >
            {loading ? (
              <CircularProgress size={20} sx={{ color: "white" }} />
            ) : (
              <SendIcon />
            )}
          </IconButton>
        </Box>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default AskAIPage;
