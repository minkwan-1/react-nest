import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
  Button,
  Card,
  CardContent,
  Avatar,
  Divider,
} from "@mui/material";

import { useAtom } from "jotai";
import { questionsAtom } from "@atom/question";
import { DetailQuestionTitle, DetailQuestionContent } from "./main-content";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { realUserInfo } from "@atom/auth";
import { marked } from "marked";
import DOMPurify from "dompurify";

// 테마 색상 - #b8dae1 기반으로 변경
const themeColors = {
  primary: "#b8dae1",
  primaryLight: "#f0f7f8",
  primaryDark: "#9cc7d0",
  background: "#FFFFFF",
  surface: "#f8fbfc",
  borderLight: "#e1f2f5",
  textPrimary: "#1E293B",
  textSecondary: "#64748B",
  upvote: "#22C55E",
  downvote: "#EF4444",
  tag: {
    bg: "#e8f5f7",
    text: "#7ba8b3",
  },
  accepted: "#059669",
  code: {
    bg: "#f0f7f8",
    border: "#d1e9ec",
    text: "#374151",
  },
  ai: {
    primary: "#85c1cc",
    light: "#f2f8f9",
    border: "#b8dae1",
  },
  user: {
    primary: "#a8d1db",
    light: "#f4f9fa",
    border: "#c5e2e8",
  },
};

type Question = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  user: {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
    createdAt: string;
  };
  userId: string;
};

type Answer = {
  id: string;
  questionId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isAiAnswer?: boolean; // AI 답변 여부를 구분하는 플래그
};

const MainContent = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [questions] = useAtom(questionsAtom);
  const [loading, setLoading] = useState(true);
  const [user] = useAtom(realUserInfo);

  // 답변 관련 상태
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [answersLoading, setAnswersLoading] = useState(true);
  const [answersError, setAnswersError] = useState<string | null>(null);

  // AI 답변 관련 상태
  const [aiAnswer, setAiAnswer] = useState<Answer | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // 사용자 답변 관련 상태
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  // AI 답변 가져오기 함수
  const fetchAiAnswer = useCallback(async () => {
    if (!question) return;

    setAiLoading(true);
    setAiError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/api/ask-ai?title=${encodeURIComponent(
          question.title
        )}&content=${encodeURIComponent(question.content)}`
      );

      if (response.ok) {
        const data = await response.json();

        // AI 답변을 Answer 형태로 변환
        const aiAnswerData: Answer = {
          id: "ai-answer",
          questionId: question.id.toString(),
          userId: "ai-assistant",
          content: data.data.answer,
          createdAt: data.data.generatedAt,
          updatedAt: data.data.generatedAt,
          isAiAnswer: true,
        };

        setAiAnswer(aiAnswerData);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `서버 오류: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "AI 답변을 불러오는 중 오류가 발생했습니다.";
      console.error("AI 답변 로딩 실패:", errorMessage);
      setAiError(errorMessage);
    } finally {
      setAiLoading(false);
    }
  }, [question]);

  // 답변 목록 가져오기
  const fetchAnswers = useCallback(async () => {
    if (!id) return;

    setAnswersLoading(true);
    setAnswersError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/answers/question/${id}`
      );

      if (response.ok) {
        const data = await response.json();
        setAnswers(data);
      } else {
        throw new Error(`서버 오류: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "답변을 불러오는 중 오류가 발생했습니다.";
      console.error("답변 로딩 실패:", errorMessage);
      setAnswersError(errorMessage);
    } finally {
      setAnswersLoading(false);
    }
  }, [id]);

  const handleSubmitAnswer = useCallback(async () => {
    if (!userAnswer.trim() || !id) {
      setSubmitError("답변 내용을 입력해주세요.");
      return;
    }

    setIsSubmittingAnswer(true);
    setSubmitError(null);

    try {
      const response = await fetch(`http://localhost:3000/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId: id,
          content: userAnswer,
          userId: user?.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("답변 등록 성공:", data);

        setUserAnswer("");
        setSubmitSuccess(true);
        // 답변 목록 새로고침
        fetchAnswers();
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `서버 오류: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";

      console.error("답변 등록 실패:", errorMessage);
      setSubmitError(errorMessage);
    } finally {
      setIsSubmittingAnswer(false);
    }
  }, [userAnswer, id, user?.id, fetchAnswers]);

  const handleCloseSnackbar = () => {
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 마크다운을 HTML로 변환하는 함수
  const convertMarkdownToHtml = (markdown: string) => {
    try {
      // marked 설정
      marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: false,
        mangle: false,
      });

      // 마크다운을 HTML로 변환
      const rawHtml = marked(markdown);

      // XSS 방지를 위한 sanitize
      const cleanHtml = DOMPurify.sanitize(rawHtml, {
        ALLOWED_TAGS: [
          "p",
          "br",
          "strong",
          "em",
          "u",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "ul",
          "ol",
          "li",
          "blockquote",
          "pre",
          "code",
          "a",
          "img",
          "table",
          "thead",
          "tbody",
          "tr",
          "th",
          "td",
          "hr",
          "del",
          "ins",
        ],
        ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "rel"],
      });

      return cleanHtml;
    } catch (error) {
      console.error("마크다운 변환 실패:", error);
      return markdown; // 변환 실패 시 원본 텍스트 반환
    }
  };

  // 사용자 이름 가져오는 함수
  const getUserName = (userId: string, isAi: boolean = false) => {
    if (isAi || userId === "ai-assistant") return "AI Assistant";
    // 실제로는 사용자 정보를 별도로 가져와야 함
    return `사용자 ${userId.slice(0, 8)}`;
  };

  // 아바타 색상 가져오기 함수
  const getAvatarColor = (userId: string, isAi: boolean = false) => {
    if (isAi || userId === "ai-assistant") return themeColors.ai.primary;
    return themeColors.user.primary;
  };

  // 답변 목록 렌더링 함수
  const renderAnswers = () => {
    const allAnswers = [];

    // AI 답변이 있으면 첫 번째로 추가
    if (aiAnswer) {
      allAnswers.push(aiAnswer);
    }

    // 일반 사용자 답변들 추가
    allAnswers.push(...answers);

    return allAnswers.map((answer) => (
      <Card
        key={answer.id}
        sx={{
          mb: 3,
          border: answer.isAiAnswer
            ? `2px solid ${themeColors.ai.primary}` // AI 답변은 AI 색상 테두리
            : `2px solid ${themeColors.user.primary}`, // 유저 답변은 유저 색상 테두리
          borderRadius: 3,
          boxShadow: answer.isAiAnswer
            ? "0 4px 20px rgba(133, 193, 204, 0.2)" // AI 답변 그림자
            : "0 4px 20px rgba(168, 209, 219, 0.2)", // 유저 답변 그림자
          "&:hover": {
            boxShadow: answer.isAiAnswer
              ? "0 8px 25px rgba(133, 193, 204, 0.3)"
              : "0 8px 25px rgba(168, 209, 219, 0.3)",
            transform: "translateY(-2px)",
          },
          position: "relative",
          backgroundColor: answer.isAiAnswer
            ? themeColors.ai.light
            : themeColors.user.light,
          transition: "all 0.3s ease",
        }}
      >
        {/* 답변 유형 배지 */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            bgcolor: answer.isAiAnswer
              ? themeColors.ai.primary
              : themeColors.user.primary,
            color: "white",
            px: 2,
            py: 0.8,
            borderRadius: 2,
            fontSize: "12px",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            zIndex: 1,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          {answer.isAiAnswer ? "🤖 AI 답변" : "👤 사용자 답변"}
        </Box>

        <CardContent sx={{ p: 4 }}>
          {/* 답변 헤더 */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: getAvatarColor(answer.userId, answer.isAiAnswer),
                mr: 2.5,
                fontSize: "16px",
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {answer.isAiAnswer ? "🤖" : getUserName(answer.userId).charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  color: answer.isAiAnswer
                    ? themeColors.ai.primary
                    : themeColors.user.primary,
                  fontWeight: 700,
                  fontSize: "16px",
                }}
              >
                {getUserName(answer.userId, answer.isAiAnswer)}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: themeColors.textSecondary,
                  fontSize: "13px",
                  mt: 0.5,
                }}
              >
                {formatDate(answer.createdAt)}
              </Typography>
            </Box>
          </Box>

          <Divider
            sx={{
              mb: 3,
              borderColor: answer.isAiAnswer
                ? themeColors.ai.border
                : themeColors.user.border,
              borderWidth: "1px",
            }}
          />

          {/* 답변 내용 */}
          <Box
            sx={{
              "& .ql-editor": {
                padding: 0,
                fontSize: "15px",
                lineHeight: 1.7,
                color: themeColors.textPrimary,
              },
              "& .ql-editor p": {
                marginBottom: "16px",
              },
              "& .ql-editor ul, & .ql-editor ol": {
                paddingLeft: "24px",
                marginBottom: "16px",
              },
              "& .ql-editor h1, & .ql-editor h2, & .ql-editor h3": {
                marginBottom: "16px",
                fontWeight: 700,
              },
              "& .ql-editor pre": {
                backgroundColor: themeColors.code.bg,
                border: `2px solid ${themeColors.code.border}`,
                borderRadius: "8px",
                padding: "16px",
                fontSize: "14px",
                fontFamily: "monospace",
                overflow: "auto",
                marginBottom: "16px",
              },
              // 마크다운 스타일링 - 개선된 버전
              fontSize: "15px",
              lineHeight: 1.7,
              color: themeColors.textPrimary,
              "& h1, & h2, & h3, & h4, & h5, & h6": {
                marginBottom: "16px",
                marginTop: "20px",
                fontWeight: 700,
                color: answer.isAiAnswer
                  ? themeColors.ai.primary
                  : themeColors.user.primary,
                "&:first-of-type": {
                  marginTop: 0,
                },
              },
              "& h1": { fontSize: "26px" },
              "& h2": { fontSize: "22px" },
              "& h3": { fontSize: "19px" },
              "& h4": { fontSize: "17px" },
              "& h5": { fontSize: "15px" },
              "& h6": { fontSize: "14px" },
              "& p": {
                marginBottom: "16px",
                lineHeight: 1.7,
                "&:last-child": {
                  marginBottom: 0,
                },
              },
              "& ul, & ol": {
                paddingLeft: "24px",
                marginBottom: "16px",
                "&:last-child": {
                  marginBottom: 0,
                },
              },
              "& li": {
                marginBottom: "6px",
                lineHeight: 1.6,
              },
              "& pre": {
                backgroundColor: themeColors.code.bg,
                border: `2px solid ${themeColors.code.border}`,
                borderRadius: "8px",
                padding: "16px",
                fontSize: "14px",
                fontFamily:
                  "'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                overflow: "auto",
                marginBottom: "16px",
                marginTop: "12px",
                lineHeight: 1.5,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                "&:last-child": {
                  marginBottom: 0,
                },
              },
              "& code": {
                backgroundColor: themeColors.code.bg,
                padding: "3px 8px",
                borderRadius: "6px",
                fontSize: "14px",
                fontFamily:
                  "'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                color: themeColors.code.text,
                border: `1px solid ${themeColors.code.border}`,
                fontWeight: 500,
              },
              "& pre code": {
                backgroundColor: "transparent",
                padding: 0,
                border: "none",
                color: "inherit",
              },
              "& blockquote": {
                borderLeft: `4px solid ${
                  answer.isAiAnswer
                    ? themeColors.ai.primary
                    : themeColors.user.primary
                }`,
                paddingLeft: "20px",
                marginLeft: 0,
                marginBottom: "16px",
                marginTop: "12px",
                color: themeColors.textSecondary,
                fontStyle: "italic",
                backgroundColor: answer.isAiAnswer
                  ? "rgba(133, 193, 204, 0.08)"
                  : "rgba(168, 209, 219, 0.08)",
                paddingTop: "12px",
                paddingBottom: "12px",
                borderRadius: "0 8px 8px 0",
                fontSize: "14px",
              },
              "& img": {
                maxWidth: "100%",
                height: "auto",
                borderRadius: "12px",
                marginTop: "12px",
                marginBottom: "12px",
                border: `2px solid ${themeColors.borderLight}`,
                display: "block",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              },
              "& table": {
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "16px",
                border: `2px solid ${themeColors.borderLight}`,
                fontSize: "14px",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              },
              "& th, & td": {
                border: `1px solid ${themeColors.borderLight}`,
                padding: "12px 16px",
                textAlign: "left",
                lineHeight: 1.5,
              },
              "& th": {
                backgroundColor: answer.isAiAnswer
                  ? themeColors.ai.light
                  : themeColors.user.light,
                fontWeight: 700,
                color: themeColors.textPrimary,
                fontSize: "13px",
              },
              "& td": {
                backgroundColor: themeColors.background,
              },
              "& strong": {
                fontWeight: 700,
                color: answer.isAiAnswer
                  ? themeColors.ai.primary
                  : themeColors.user.primary,
              },
              "& em": {
                fontStyle: "italic",
                color: themeColors.textSecondary,
              },
              "& hr": {
                border: "none",
                borderTop: `2px solid ${themeColors.borderLight}`,
                margin: "24px 0",
                borderRadius: "1px",
              },
              "& a": {
                color: answer.isAiAnswer
                  ? themeColors.ai.primary
                  : themeColors.user.primary,
                textDecoration: "none",
                fontWeight: 600,
                "&:hover": {
                  textDecoration: "underline",
                  opacity: 0.8,
                },
              },
            }}
            dangerouslySetInnerHTML={{
              __html: answer.isAiAnswer
                ? convertMarkdownToHtml(answer.content)
                : answer.content,
            }}
          />
        </CardContent>
      </Card>
    ));
  };

  useEffect(() => {
    if (!id || !questions || questions.length === 0) {
      setLoading(false);
      return;
    }

    const foundQuestion = questions.find((q) => q.id === parseInt(id));

    const timer = setTimeout(() => {
      setQuestion(foundQuestion || null);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id, questions]);

  // 답변 목록 가져오기
  useEffect(() => {
    if (id && !loading) {
      fetchAnswers();
    }
  }, [id, loading, fetchAnswers]);

  // question이 로드된 후 AI 답변 가져오기
  useEffect(() => {
    if (question && !loading) {
      fetchAiAnswer();
    }
  }, [question, loading, fetchAiAnswer]);

  useEffect(() => {
    if (!loading && question) {
      document.querySelectorAll("pre code").forEach((block) => {
        if (block && block.parentElement) {
          block.parentElement.style.background = themeColors.code.bg;
          block.parentElement.style.border = `2px solid ${themeColors.code.border}`;
          block.parentElement.style.borderRadius = "8px";
          block.parentElement.style.padding = "16px";
          block.parentElement.style.overflow = "auto";
          block.parentElement.style.fontSize = "14px";
          block.parentElement.style.fontFamily = "monospace";
          block.parentElement.style.lineHeight = "1.5";
          block.parentElement.style.marginBottom = "16px";
          block.parentElement.style.marginTop = "12px";
          block.parentElement.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
        }
      });

      document.querySelectorAll("img").forEach((img) => {
        img.style.maxWidth = "100%";
        img.style.height = "auto";
        img.style.borderRadius = "12px";
        img.style.marginTop = "12px";
        img.style.marginBottom = "12px";
        img.style.border = `2px solid ${themeColors.borderLight}`;
        img.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      });
    }
  }, [loading, question]);

  return (
    <Box
      sx={{
        flex: 1.5,
        pr: { xs: "0", sm: "0", md: "2" },
        overflowY: "auto",
        height: "100%",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: themeColors.surface,
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: themeColors.primary,
          borderRadius: "4px",
          "&:hover": {
            backgroundColor: themeColors.primaryDark,
          },
        },
      }}
    >
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress sx={{ color: themeColors.primary }} />
        </Box>
      ) : !question ? (
        <Box sx={{ py: 4, textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{ color: themeColors.textSecondary, mb: 2 }}
          >
            질문을 찾을 수 없습니다
          </Typography>
          <Typography variant="body1" sx={{ color: themeColors.textSecondary }}>
            요청하신 질문이 존재하지 않거나 삭제되었을 수 있습니다.
          </Typography>
        </Box>
      ) : (
        <>
          <DetailQuestionTitle />
          <DetailQuestionContent />

          {/* 답변 작성 섹션 - 개선된 스타일링 */}
          <Box sx={{ mt: 6 }}>
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                color: themeColors.textPrimary,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              ✍️ 답변 작성
            </Typography>

            {submitError && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  boxShadow: "0 2px 8px rgba(239, 68, 68, 0.15)",
                }}
              >
                {submitError}
              </Alert>
            )}

            <Card
              sx={{
                border: `2px solid ${themeColors.primary}`,
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(184, 218, 225, 0.2)",
                mb: 3,
                "&:hover": {
                  boxShadow: "0 6px 25px rgba(184, 218, 225, 0.3)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <ReactQuill
                  value={userAnswer}
                  onChange={setUserAnswer}
                  modules={quillModules}
                  theme="snow"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    opacity: isSubmittingAnswer ? 0.6 : 1,
                    minHeight: "200px",
                  }}
                  readOnly={isSubmittingAnswer}
                />
              </CardContent>
            </Card>

            <Box sx={{ textAlign: "right" }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: themeColors.primary,
                  color: "white",
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: "16px",
                  boxShadow: "0 4px 15px rgba(184, 218, 225, 0.4)",
                  "&:hover": {
                    bgcolor: themeColors.primaryDark,
                    boxShadow: "0 6px 20px rgba(184, 218, 225, 0.5)",
                    transform: "translateY(-2px)",
                  },
                  "&:disabled": {
                    bgcolor: "#e0e0e0",
                    boxShadow: "none",
                  },
                  transition: "all 0.3s ease",
                }}
                onClick={handleSubmitAnswer}
                disabled={isSubmittingAnswer || !userAnswer.trim()}
              >
                {isSubmittingAnswer ? (
                  <>
                    <CircularProgress
                      size={20}
                      sx={{ mr: 1, color: "white" }}
                    />
                    등록 중...
                  </>
                ) : (
                  <>📝 답변 등록</>
                )}
              </Button>
            </Box>
          </Box>

          {/* 답변 목록 섹션 - 개선된 헤더 */}
          <Box sx={{ mt: 6 }}>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                color: themeColors.textPrimary,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              💬 답변 목록 ({(aiAnswer ? 1 : 0) + answers.length})
            </Typography>

            {/* AI 답변 로딩 상태 - 개선된 스타일링 */}
            {aiLoading && (
              <Card
                sx={{
                  mb: 4,
                  border: `2px solid ${themeColors.ai.primary}`,
                  borderRadius: 3,
                  boxShadow: "0 4px 20px rgba(133, 193, 204, 0.2)",
                  backgroundColor: themeColors.ai.light,
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%": {
                      opacity: 1,
                    },
                    "50%": {
                      opacity: 0.8,
                    },
                    "100%": {
                      opacity: 1,
                    },
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <CircularProgress
                    size={32}
                    sx={{ color: themeColors.ai.primary, mb: 2 }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: themeColors.ai.primary,
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    🤖 AI가 답변을 생성하고 있습니다...
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: themeColors.textSecondary,
                      fontSize: "14px",
                    }}
                  >
                    질문을 분석하고 최적의 답변을 준비 중입니다
                  </Typography>
                </CardContent>
              </Card>
            )}

            {/* AI 답변 에러 상태 - 개선된 스타일링 */}
            {aiError && (
              <Alert
                severity="warning"
                sx={{
                  mb: 4,
                  borderRadius: 3,
                  border: "2px solid #f59e0b",
                  boxShadow: "0 4px 15px rgba(245, 158, 11, 0.2)",
                  "& .MuiAlert-message": {
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontSize: "15px",
                    fontWeight: 600,
                  },
                }}
              >
                🤖 AI 답변 생성 실패: {aiError}
              </Alert>
            )}

            {/* 일반 답변 로딩/에러 상태 - 개선된 스타일링 */}
            {answersLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  py: 6,
                  backgroundColor: themeColors.surface,
                  borderRadius: 3,
                  border: `2px solid ${themeColors.borderLight}`,
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <CircularProgress
                    size={32}
                    sx={{ color: themeColors.primary, mb: 2 }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ color: themeColors.textSecondary, fontWeight: 600 }}
                  >
                    답변을 불러오는 중...
                  </Typography>
                </Box>
              </Box>
            ) : answersError ? (
              <Alert
                severity="error"
                sx={{
                  mb: 4,
                  borderRadius: 3,
                  border: "2px solid #ef4444",
                  boxShadow: "0 4px 15px rgba(239, 68, 68, 0.2)",
                  "& .MuiAlert-message": {
                    fontSize: "15px",
                    fontWeight: 600,
                  },
                }}
              >
                사용자 답변 로딩 실패: {answersError}
              </Alert>
            ) : !aiAnswer && answers.length === 0 && !aiLoading ? (
              <Card
                sx={{
                  textAlign: "center",
                  py: 6,
                  px: 4,
                  bgcolor: themeColors.surface,
                  borderRadius: 3,
                  border: `2px dashed ${themeColors.primary}`,
                  boxShadow: "0 4px 15px rgba(184, 218, 225, 0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: themeColors.textSecondary,
                    mb: 2,
                    fontWeight: 600,
                  }}
                >
                  💭 아직 답변이 없습니다
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: themeColors.textSecondary }}
                >
                  첫 번째 답변을 작성해서 토론을 시작해보세요!
                </Typography>
              </Card>
            ) : (
              <Box sx={{ mb: 4 }}>{renderAnswers()}</Box>
            )}
          </Box>

          {/* 성공/에러 스낵바 - 개선된 스타일링 */}
          <Snackbar
            open={submitSuccess}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              sx={{
                borderRadius: 3,
                fontWeight: 600,
                fontSize: "15px",
                boxShadow: "0 8px 25px rgba(34, 197, 94, 0.3)",
                "& .MuiAlert-icon": {
                  fontSize: "20px",
                },
              }}
            >
              🎉 답변이 성공적으로 등록되었습니다!
            </Alert>
          </Snackbar>
        </>
      )}
    </Box>
  );
};

export default MainContent;
