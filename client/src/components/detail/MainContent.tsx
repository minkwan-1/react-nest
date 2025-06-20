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

// 테마 색상
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
    primary: "#4F46E5",
    light: "#EEF2FF",
    border: "#A5B4FC",
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
    return themeColors.primary;
  };

  // 답변 목록 렌더링 함수
  const renderAnswers = () => {
    const allAnswers = [];

    // AI 답변이 있으면 첫 번째로 추가
    if (aiAnswer) {
      allAnswers.push(aiAnswer);
    }

    // 일반 사용자 답변들 추가1
    allAnswers.push(...answers);

    return allAnswers.map((answer) => (
      <Card
        key={answer.id}
        sx={{
          mb: 3,
          border: answer.isAiAnswer
            ? `2px solid ${themeColors.ai.primary}` // AI 답변은 보라색 테두리
            : `1px solid ${themeColors.borderLight}`,
          borderRadius: 2,
          boxShadow: answer.isAiAnswer
            ? "0 4px 12px rgba(79, 70, 229, 0.15)" // AI 답변은 특별한 그림자
            : "0 2px 4px rgba(0,0,0,0.1)",
          "&:hover": {
            boxShadow: answer.isAiAnswer
              ? "0 6px 16px rgba(79, 70, 229, 0.2)"
              : "0 4px 8px rgba(0,0,0,0.15)",
          },
          position: "relative",
          backgroundColor: answer.isAiAnswer
            ? themeColors.ai.light
            : themeColors.background,
        }}
      >
        {/* AI 답변 배지 */}
        {answer.isAiAnswer && (
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              bgcolor: themeColors.ai.primary,
              color: "white",
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontSize: "12px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              zIndex: 1,
            }}
          >
            🤖 AI 답변
          </Box>
        )}

        <CardContent sx={{ p: 3 }}>
          {/* 답변 헤더 */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: getAvatarColor(answer.userId, answer.isAiAnswer),
                mr: 2,
                fontSize: "14px",
              }}
            >
              {answer.isAiAnswer ? "🤖" : getUserName(answer.userId).charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: answer.isAiAnswer
                    ? themeColors.ai.primary
                    : themeColors.textPrimary,
                  fontWeight: 600,
                }}
              >
                {getUserName(answer.userId, answer.isAiAnswer)}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: themeColors.textSecondary }}
              >
                {formatDate(answer.createdAt)}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* 답변 내용 */}
          <Box
            sx={{
              "& .ql-editor": {
                padding: 0,
                fontSize: "14px",
                lineHeight: 1.6,
                color: themeColors.textPrimary,
              },
              "& .ql-editor p": {
                marginBottom: "12px",
              },
              "& .ql-editor ul, & .ql-editor ol": {
                paddingLeft: "20px",
                marginBottom: "12px",
              },
              "& .ql-editor h1, & .ql-editor h2, & .ql-editor h3": {
                marginBottom: "12px",
                fontWeight: 600,
              },
              "& .ql-editor pre": {
                backgroundColor: themeColors.code.bg,
                border: `1px solid ${themeColors.code.border}`,
                borderRadius: "6px",
                padding: "12px",
                fontSize: "13px",
                fontFamily: "monospace",
                overflow: "auto",
                marginBottom: "12px",
              },
              // 마크다운 스타일링
              fontSize: "14px",
              lineHeight: 1.6,
              color: themeColors.textPrimary,
              "& h1, & h2, & h3, & h4, & h5, & h6": {
                marginBottom: "12px",
                marginTop: "16px",
                fontWeight: 600,
                color: themeColors.textPrimary,
                "&:first-of-type": {
                  marginTop: 0,
                },
              },
              "& h1": { fontSize: "24px" },
              "& h2": { fontSize: "20px" },
              "& h3": { fontSize: "18px" },
              "& h4": { fontSize: "16px" },
              "& h5": { fontSize: "14px" },
              "& h6": { fontSize: "12px" },
              "& p": {
                marginBottom: "12px",
                lineHeight: 1.6,
                "&:last-child": {
                  marginBottom: 0,
                },
              },
              "& ul, & ol": {
                paddingLeft: "20px",
                marginBottom: "12px",
                "&:last-child": {
                  marginBottom: 0,
                },
              },
              "& li": {
                marginBottom: "4px",
                lineHeight: 1.5,
              },
              "& pre": {
                backgroundColor: themeColors.code.bg,
                border: `1px solid ${themeColors.code.border}`,
                borderRadius: "6px",
                padding: "12px",
                fontSize: "13px",
                fontFamily:
                  "'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                overflow: "auto",
                marginBottom: "12px",
                marginTop: "8px",
                lineHeight: 1.4,
                "&:last-child": {
                  marginBottom: 0,
                },
              },
              "& code": {
                backgroundColor: themeColors.code.bg,
                padding: "2px 6px",
                borderRadius: "4px",
                fontSize: "13px",
                fontFamily:
                  "'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                color: themeColors.code.text,
                border: `1px solid ${themeColors.code.border}`,
              },
              "& pre code": {
                backgroundColor: "transparent",
                padding: 0,
                border: "none",
                color: "inherit",
              },
              "& blockquote": {
                borderLeft: `4px solid ${themeColors.ai.primary}`,
                paddingLeft: "16px",
                marginLeft: 0,
                marginBottom: "12px",
                marginTop: "8px",
                color: themeColors.textSecondary,
                fontStyle: "italic",
                backgroundColor: answer.isAiAnswer
                  ? "rgba(79, 70, 229, 0.05)"
                  : "transparent",
                paddingTop: "8px",
                paddingBottom: "8px",
                borderRadius: "0 4px 4px 0",
              },
              "& img": {
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                marginTop: "8px",
                marginBottom: "8px",
                border: `1px solid ${themeColors.borderLight}`,
                display: "block",
              },
              "& table": {
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "12px",
                border: `1px solid ${themeColors.borderLight}`,
                fontSize: "13px",
              },
              "& th, & td": {
                border: `1px solid ${themeColors.borderLight}`,
                padding: "8px 12px",
                textAlign: "left",
                lineHeight: 1.4,
              },
              "& th": {
                backgroundColor: themeColors.surface,
                fontWeight: 600,
                color: themeColors.textPrimary,
              },
              "& td": {
                backgroundColor: themeColors.background,
              },
              "& strong": {
                fontWeight: 600,
                color: themeColors.textPrimary,
              },
              "& em": {
                fontStyle: "italic",
              },
              "& hr": {
                border: "none",
                borderTop: `2px solid ${themeColors.borderLight}`,
                margin: "20px 0",
              },
              "& a": {
                color: themeColors.primary,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              },
              // AI 답변 특별 스타일
              ...(answer.isAiAnswer && {
                "& h1, & h2, & h3": {
                  color: themeColors.ai.primary,
                },
                "& strong": {
                  color: themeColors.ai.primary,
                },
              }),
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
          block.parentElement.style.border = `1px solid ${themeColors.code.border}`;
          block.parentElement.style.borderRadius = "6px";
          block.parentElement.style.padding = "16px";
          block.parentElement.style.overflow = "auto";
          block.parentElement.style.fontSize = "14px";
          block.parentElement.style.fontFamily = "monospace";
          block.parentElement.style.lineHeight = "1.5";
          block.parentElement.style.marginBottom = "16px";
          block.parentElement.style.marginTop = "10px";
        }
      });

      document.querySelectorAll("img").forEach((img) => {
        img.style.maxWidth = "100%";
        img.style.height = "auto";
        img.style.borderRadius = "8px";
        img.style.marginTop = "8px";
        img.style.marginBottom = "8px";
        img.style.border = `1px solid ${themeColors.borderLight}`;
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

          {/* 답변 작성 섹션 */}
          <Box sx={{ mt: 5 }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: themeColors.textPrimary }}
            >
              답변 작성
            </Typography>

            {submitError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {submitError}
              </Alert>
            )}

            <ReactQuill
              value={userAnswer}
              onChange={setUserAnswer}
              modules={quillModules}
              theme="snow"
              style={{
                backgroundColor: "#fff",
                borderRadius: 8,
                opacity: isSubmittingAnswer ? 0.6 : 1,
              }}
              readOnly={isSubmittingAnswer}
            />

            <Box sx={{ mt: 2, textAlign: "right" }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#b8dae1",
                  "&:hover": {
                    bgcolor: "#a0c9d1",
                  },
                  "&:disabled": {
                    bgcolor: "#e0e0e0",
                  },
                }}
                onClick={handleSubmitAnswer}
                disabled={isSubmittingAnswer || !userAnswer.trim()}
              >
                {isSubmittingAnswer ? (
                  <>
                    <CircularProgress size={16} sx={{ mr: 1 }} />
                    등록 중...
                  </>
                ) : (
                  "답변 등록"
                )}
              </Button>
            </Box>
          </Box>

          {/* 답변 목록 섹션 */}
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h6"
              sx={{ mb: 3, color: themeColors.textPrimary }}
            >
              답변 ({(aiAnswer ? 1 : 0) + answers.length})
            </Typography>

            {/* AI 답변 로딩 상태 */}
            {aiLoading && (
              <Card
                sx={{
                  mb: 3,
                  border: `2px solid ${themeColors.ai.primary}`,
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(79, 70, 229, 0.15)",
                  backgroundColor: themeColors.ai.light,
                }}
              >
                <CardContent sx={{ p: 3, textAlign: "center" }}>
                  <CircularProgress
                    size={24}
                    sx={{ color: themeColors.ai.primary, mb: 2 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: themeColors.ai.primary, fontWeight: 600 }}
                  >
                    🤖 AI가 답변을 생성하고 있습니다...
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: themeColors.textSecondary,
                      display: "block",
                      mt: 0.5,
                    }}
                  >
                    질문을 분석하고 최적의 답변을 준비 중입니다
                  </Typography>
                </CardContent>
              </Card>
            )}

            {/* AI 답변 에러 상태 */}
            {aiError && (
              <Alert
                severity="warning"
                sx={{
                  mb: 3,
                  "& .MuiAlert-message": {
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  },
                }}
              >
                🤖 AI 답변 생성 실패: {aiError}
              </Alert>
            )}

            {/* 일반 답변 로딩/에러 상태 */}
            {answersLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress
                  size={24}
                  sx={{ color: themeColors.primary }}
                />
              </Box>
            ) : answersError ? (
              <Alert severity="error" sx={{ mb: 3 }}>
                사용자 답변 로딩 실패: {answersError}
              </Alert>
            ) : !aiAnswer && answers.length === 0 && !aiLoading ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 4,
                  bgcolor: themeColors.surface,
                  borderRadius: 2,
                  border: `1px solid ${themeColors.borderLight}`,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: themeColors.textSecondary }}
                >
                  아직 답변이 없습니다. 첫 번째 답변을 작성해보세요!
                </Typography>
              </Box>
            ) : (
              <Box sx={{ mb: 4 }}>{renderAnswers()}</Box>
            )}
          </Box>

          <Snackbar
            open={submitSuccess}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleCloseSnackbar} severity="success">
              답변이 성공적으로 등록되었습니다!
            </Alert>
          </Snackbar>
        </>
      )}
    </Box>
  );
};

export default MainContent;
