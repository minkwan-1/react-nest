import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Chip,
  Avatar,
  IconButton,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  alpha,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CodeIcon from "@mui/icons-material/Code";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import SendIcon from "@mui/icons-material/Send";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "highlight.js/styles/github-dark.css";
import { CodeHighlightStyles, ErrorCard } from "@components/ask-ai";

// 메인 컨텐츠와 동일한 테마 색상
const themeColors = {
  primary: "#3B82F6",
  primaryLight: "#EFF6FF",
  primaryDark: "#1E40AF",
  background: "#FFFFFF",
  surface: "#F8FAFC",
  borderLight: "#E2E8F0",
  textPrimary: "#1E293B",
  textSecondary: "#64748B",
  upvote: "#22C55E",
  downvote: "#EF4444",
  tag: {
    bg: "#E0F2FE",
    text: "#0369A1",
  },
  accepted: "#059669",
  code: {
    bg: "#F8F9FC",
    border: "#E5E7EB",
    text: "#374151",
  },
  ai: {
    bg: "#F0F9FF",
    border: "#BAE6FD",
    accent: "#0EA5E9",
  },
};

interface Answer {
  id: string;
  content: string;
  code?: string;
  language?: string;
  tags: string[];
  votes: number;
  timestamp: Date;
  author: string;
  type: "text" | "code" | "mixed";
}

const SideContent = () => {
  const [answerContent, setAnswerContent] = useState("");
  const [codeContent, setCodeContent] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [filter, setFilter] = useState<"all" | "text" | "code" | "mixed">(
    "all"
  );

  const languages = [
    "javascript",
    "typescript",
    "python",
    "java",
    "cpp",
    "csharp",
    "html",
    "css",
    "sql",
    "bash",
    "json",
    "xml",
    "markdown",
  ];

  const handleSubmit = async () => {
    if (!answerContent.trim() && !codeContent.trim()) return;

    const answerType =
      activeTab === 0 ? "text" : activeTab === 1 ? "code" : "mixed";
    const answerTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    setLoading(true);
    setError("");

    try {
      const payload = {
        content: answerContent,
        code: codeContent || undefined,
        language: codeContent ? selectedLanguage : undefined,
        tags: answerTags,
        type: answerType,
      };

      const res = await fetch("http://localhost:3000/api/submit-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("서버 오류가 발생했습니다");
      }

      const newAnswer: Answer = {
        id: Date.now().toString(),
        content: answerContent,
        code: codeContent || undefined,
        language: codeContent ? selectedLanguage : undefined,
        tags: answerTags,
        votes: 0,
        timestamp: new Date(),
        author: "개발자",
        type: answerType,
      };

      setAnswers((prev) => [newAnswer, ...prev]);
      setAnswerContent("");
      setCodeContent("");
      setTags("");
    } catch (err: unknown) {
      console.error(err);
      setError("답변 제출에 실패했습니다. 나중에 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleVote = (id: string, direction: "up" | "down") => {
    setAnswers((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, votes: item.votes + (direction === "up" ? 1 : -1) }
          : item
      )
    );
  };

  const filteredAnswers = answers.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "방금 전";
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}시간 전`;
    return `${Math.floor(diffInMinutes / 1440)}일 전`;
  };

  const generateAvatarText = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const renderCodeBlock = (code: string, language: string) => (
    <Box
      sx={{
        backgroundColor: themeColors.code.bg,
        border: `1px solid ${themeColors.code.border}`,
        borderRadius: 2,
        p: 2,
        mt: 2,
        position: "relative",
        overflow: "auto",
        fontSize: "14px",
        fontFamily: "monospace",
        lineHeight: 1.5,
        "& pre": {
          margin: 0,
          padding: 0,
          backgroundColor: "transparent",
          color: themeColors.code.text,
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
        },
      }}
    >
      <Chip
        label={language}
        size="small"
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: themeColors.primary,
          color: "#fff",
          fontSize: "11px",
          fontWeight: 500,
        }}
      />
      <pre>{code}</pre>
    </Box>
  );

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "none", md: "block" },
        flex: 1,
        pl: 6,
        position: "sticky",
        alignSelf: "flex-start",
        overflowY: "auto",
        height: "100%",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#F1F1F1",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#BDBDBD",
          borderRadius: "10px",
        },
      }}
    >
      <CodeHighlightStyles />

      {/* Header */}
      <Box
        sx={{
          padding: "0 0 24px",
          borderBottom: `1px solid ${themeColors.borderLight}`,
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            color: themeColors.textPrimary,
            mb: 2,
            fontSize: { xs: "1.5rem", md: "2rem" },
          }}
        >
          답변 작성
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: themeColors.textSecondary,
            lineHeight: 1.6,
          }}
        >
          텍스트, 코드, 또는 혼합 형태의 답변을 작성하세요
        </Typography>
      </Box>

      {/* Answer Form */}
      <Paper
        elevation={0}
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 2,
          bgcolor: themeColors.background,
          border: `1px solid ${themeColors.borderLight}`,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 600,
            color: themeColors.textPrimary,
          }}
        >
          새 답변 작성
        </Typography>

        {/* Tab Selection */}
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            mb: 3,
            "& .MuiTabs-indicator": {
              backgroundColor: themeColors.primary,
            },
            "& .MuiTab-root": {
              color: themeColors.textSecondary,
              fontWeight: 500,
              "&.Mui-selected": {
                color: themeColors.primary,
              },
            },
          }}
        >
          <Tab icon={<TextFieldsIcon />} label="텍스트" />
          <Tab icon={<CodeIcon />} label="코드" />
          <Tab icon={<CodeIcon />} label="텍스트 + 코드" />
        </Tabs>

        {/* Text Content */}
        {(activeTab === 0 || activeTab === 2) && (
          <TextField
            fullWidth
            multiline
            rows={6}
            placeholder="답변 내용을 입력해주세요..."
            value={answerContent}
            onChange={(e) => setAnswerContent(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: themeColors.surface,
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: themeColors.primary,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: themeColors.primary,
                },
              },
            }}
            label="답변 내용"
          />
        )}

        {/* Code Content */}
        {(activeTab === 1 || activeTab === 2) && (
          <>
            <FormControl sx={{ mb: 2, minWidth: 200 }}>
              <InputLabel
                sx={{
                  "&.Mui-focused": { color: themeColors.primary },
                }}
              >
                언어 선택
              </InputLabel>
              <Select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                label="언어 선택"
                sx={{
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: themeColors.primary,
                  },
                }}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              multiline
              rows={8}
              placeholder="코드를 입력해주세요..."
              value={codeContent}
              onChange={(e) => setCodeContent(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiInputBase-input": {
                  fontFamily:
                    'Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
                  fontSize: "14px",
                  backgroundColor: themeColors.code.bg,
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: themeColors.primary,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: themeColors.primary,
                  },
                },
              }}
              label="코드"
            />
          </>
        )}

        <TextField
          fullWidth
          placeholder="태그를 쉼표로 구분해서 입력해주세요 (예: javascript, react, bug-fix)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              backgroundColor: themeColors.surface,
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: themeColors.primary,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: themeColors.primary,
              },
            },
          }}
          label="태그"
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || (!answerContent.trim() && !codeContent.trim())}
          startIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <SendIcon />
            )
          }
          size="large"
          sx={{
            backgroundColor: themeColors.primary,
            "&:hover": {
              backgroundColor: themeColors.primaryDark,
            },
            fontWeight: 600,
            py: 1.5,
            px: 3,
          }}
        >
          {loading ? "제출 중..." : "답변 제출"}
        </Button>
      </Paper>

      {error && <ErrorCard error={error} />}

      {/* Filter Section */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: themeColors.textPrimary,
          }}
        >
          답변 목록
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
          <Button
            variant={filter === "all" ? "contained" : "outlined"}
            onClick={() => setFilter("all")}
            size="small"
            sx={{
              fontWeight: 500,
              ...(filter === "all" && {
                backgroundColor: themeColors.primary,
                "&:hover": { backgroundColor: themeColors.primaryDark },
              }),
            }}
          >
            전체 ({answers.length})
          </Button>
          <Button
            variant={filter === "text" ? "contained" : "outlined"}
            onClick={() => setFilter("text")}
            size="small"
            sx={{
              fontWeight: 500,
              ...(filter === "text" && {
                backgroundColor: themeColors.primary,
                "&:hover": { backgroundColor: themeColors.primaryDark },
              }),
            }}
          >
            텍스트 ({answers.filter((a) => a.type === "text").length})
          </Button>
          <Button
            variant={filter === "code" ? "contained" : "outlined"}
            onClick={() => setFilter("code")}
            size="small"
            sx={{
              fontWeight: 500,
              ...(filter === "code" && {
                backgroundColor: themeColors.primary,
                "&:hover": { backgroundColor: themeColors.primaryDark },
              }),
            }}
          >
            코드 ({answers.filter((a) => a.type === "code").length})
          </Button>
          <Button
            variant={filter === "mixed" ? "contained" : "outlined"}
            onClick={() => setFilter("mixed")}
            size="small"
            sx={{
              fontWeight: 500,
              ...(filter === "mixed" && {
                backgroundColor: themeColors.primary,
                "&:hover": { backgroundColor: themeColors.primaryDark },
              }),
            }}
          >
            혼합 ({answers.filter((a) => a.type === "mixed").length})
          </Button>
        </Stack>
      </Box>

      {/* Answers List */}
      <Box sx={{ space: 2 }}>
        {filteredAnswers.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: "center",
              backgroundColor: themeColors.surface,
              borderRadius: 2,
              border: `1px solid ${themeColors.borderLight}`,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: themeColors.textSecondary,
                fontWeight: 500,
              }}
            >
              아직 답변이 없습니다. 첫 번째 답변을 작성해보세요!
            </Typography>
          </Paper>
        ) : (
          filteredAnswers.map((answer) => (
            <Paper
              key={answer.id}
              elevation={0}
              sx={{
                mb: 3,
                borderRadius: 2,
                bgcolor: themeColors.background,
                border: `1px solid ${themeColors.borderLight}`,
                overflow: "hidden",
              }}
            >
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                  {/* Vote Section */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mr: 3,
                      minWidth: 60,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleVote(answer.id, "up")}
                      sx={{
                        color:
                          answer.votes > 0
                            ? themeColors.upvote
                            : themeColors.textSecondary,
                        "&:hover": {
                          backgroundColor: alpha(themeColors.upvote, 0.1),
                        },
                      }}
                    >
                      <ThumbUpIcon />
                    </IconButton>
                    <Typography
                      variant="h6"
                      sx={{
                        my: 1,
                        fontWeight: "bold",
                        color:
                          answer.votes > 0
                            ? themeColors.upvote
                            : answer.votes < 0
                            ? themeColors.downvote
                            : themeColors.textSecondary,
                      }}
                    >
                      {answer.votes}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleVote(answer.id, "down")}
                      sx={{
                        color:
                          answer.votes < 0
                            ? themeColors.downvote
                            : themeColors.textSecondary,
                        "&:hover": {
                          backgroundColor: alpha(themeColors.downvote, 0.1),
                        },
                      }}
                    >
                      <ThumbDownIcon />
                    </IconButton>
                  </Box>

                  {/* Answer Content */}
                  <Box sx={{ flex: 1 }}>
                    {/* Answer Meta */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            mr: 2,
                            border: "1px solid #adb5be",
                            backgroundColor: "#b8dae1",
                            color: "white",
                            fontWeight: 600,
                          }}
                        >
                          {generateAvatarText(answer.author)}
                        </Avatar>
                        <Box>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 600,
                              color: themeColors.textPrimary,
                            }}
                          >
                            {answer.author}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                              color: themeColors.textSecondary,
                              alignItems: "center",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              <AccessTimeIcon fontSize="small" />
                              <Typography variant="caption">
                                {formatTimeAgo(answer.timestamp)}
                              </Typography>
                            </Box>
                          </Stack>
                        </Box>
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Chip
                          label={
                            answer.type === "text"
                              ? "텍스트"
                              : answer.type === "code"
                              ? "코드"
                              : "혼합"
                          }
                          size="small"
                          sx={{
                            backgroundColor:
                              answer.type === "code"
                                ? themeColors.primaryLight
                                : answer.type === "mixed"
                                ? themeColors.tag.bg
                                : themeColors.surface,
                            color:
                              answer.type === "code"
                                ? themeColors.primary
                                : answer.type === "mixed"
                                ? themeColors.tag.text
                                : themeColors.textSecondary,
                            fontWeight: 500,
                          }}
                        />
                        <IconButton
                          size="small"
                          sx={{ color: themeColors.textSecondary }}
                        >
                          <BookmarkIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{ color: themeColors.textSecondary }}
                        >
                          <ShareIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>

                    {/* Text Content */}
                    {answer.content && (
                      <Typography
                        variant="body1"
                        sx={{
                          mb: 2,
                          color: themeColors.textPrimary,
                          lineHeight: 1.7,
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {answer.content}
                      </Typography>
                    )}

                    {/* Code Content */}
                    {answer.code &&
                      answer.language &&
                      renderCodeBlock(answer.code, answer.language)}

                    {/* Tags */}
                    <Box
                      sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}
                    >
                      {answer.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          sx={{
                            backgroundColor: themeColors.tag.bg,
                            color: themeColors.tag.text,
                            fontWeight: 500,
                            fontSize: "0.75rem",
                            borderRadius: "4px",
                            "&:hover": {
                              backgroundColor: alpha(themeColors.tag.bg, 0.7),
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          ))
        )}
      </Box>
    </Box>
  );
};

export default SideContent;
