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
  }, [userAnswer, id, fetchAnswers]);

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

  // 사용자 이름 가져오는 함수 (임시로 userId 사용)
  const getUserName = (userId: string) => {
    // 실제로는 사용자 정보를 별도로 가져와야 함
    return `사용자 ${userId.slice(0, 8)}`;
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
              답변 ({answers.length})
            </Typography>

            {answersLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress
                  size={24}
                  sx={{ color: themeColors.primary }}
                />
              </Box>
            ) : answersError ? (
              <Alert severity="error" sx={{ mb: 3 }}>
                {answersError}
              </Alert>
            ) : answers.length === 0 ? (
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
              <Box sx={{ mb: 4 }}>
                {answers.map((answer) => (
                  <Card
                    key={answer.id}
                    sx={{
                      mb: 3,
                      border: `1px solid ${themeColors.borderLight}`,
                      borderRadius: 2,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      "&:hover": {
                        boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      {/* 답변 헤더 */}
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: themeColors.primary,
                            mr: 2,
                            fontSize: "14px",
                          }}
                        >
                          {getUserName(answer.userId).charAt(0)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: themeColors.textPrimary,
                              fontWeight: 600,
                            }}
                          >
                            {getUserName(answer.userId)}
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
                        }}
                        dangerouslySetInnerHTML={{ __html: answer.content }}
                      />
                    </CardContent>
                  </Card>
                ))}
              </Box>
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
