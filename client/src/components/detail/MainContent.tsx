import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Chip,
  Paper,
  alpha,
  Divider,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";

import { useAtom } from "jotai";
import { questionsAtom } from "@atom/question";
import { DetailQuestionTitle, DetailQuestionContent } from "./main-content";

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
    bg: "#F0F9FF",
    border: "#BAE6FD",
    accent: "#0EA5E9",
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

const MainContent = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [questions] = useAtom(questionsAtom);
  const [loading, setLoading] = useState(true);

  // AI 답변 관련 상태
  const [aiAnswer, setAiAnswer] = useState<string>("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnswerGenerated, setAiAnswerGenerated] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  console.log("상세 페이지의 메인 컨텐츠에서 보여줄 데이터: ", questions);

  // Gemini AI 답변 생성 함수 - useCallback으로 메모이제이션
  const generateAiAnswer = useCallback(async (questionData: Question) => {
    console.log("AI 답변 생성 시작:", questionData.id);
    setAiLoading(true);
    setAiError(null);
    setAiAnswerGenerated(false);

    try {
      const response = await fetch(
        `http://localhost:3000/api/ai-answer/${questionData.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: questionData.title,
            content: questionData.content,
          }),
        }
      );

      console.log("AI API 응답 상태:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("AI 답변 생성 성공:", data);
        setAiAnswer(data.answer);
        setAiAnswerGenerated(true);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("AI API 오류 응답:", errorData);
        throw new Error(`서버 오류: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Gemini AI 답변 생성 오류:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";

      setAiError(errorMessage);
      setAiAnswer(
        "죄송합니다. Gemini AI 답변을 생성하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
      setAiAnswerGenerated(true);
    } finally {
      setAiLoading(false);
    }
  }, []);

  // 질문 데이터 로드 및 AI 답변 자동 생성
  useEffect(() => {
    console.log(
      "useEffect 실행 - id:",
      id,
      "questions 길이:",
      questions?.length
    );

    if (!id || !questions || questions.length === 0) {
      console.log("조건 불만족 - 로딩 완료");
      setLoading(false);
      return;
    }

    // URL의 id와 일치하는 질문 찾기
    const foundQuestion = questions.find((q) => q.id === parseInt(id));
    console.log("찾은 질문:", foundQuestion);

    // API 호출 시뮬레이션 (실제로는 이미 데이터가 있으므로 짧은 딜레이만)
    const timer = setTimeout(() => {
      setQuestion(foundQuestion || null);
      setLoading(false);

      // 질문이 있으면 자동으로 Gemini AI 답변 생성
      if (foundQuestion) {
        console.log("질문 발견 - AI 답변 생성 시작");
        generateAiAnswer(foundQuestion);
      } else {
        console.log("질문을 찾을 수 없음");
      }
    }, 300);

    return () => {
      console.log("useEffect 클린업");
      clearTimeout(timer);
    };
  }, [id, questions, generateAiAnswer]);

  // 코드 하이라이팅 및 이미지 스타일링 적용
  useEffect(() => {
    if (!loading && question) {
      // 코드 하이라이팅 적용
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

      // 이미지 스타일링 적용
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
        pr: { xs: "0", sm: "0", md: "3" },
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
          {/* 질문 헤더 */}
          <DetailQuestionTitle />

          {/* 질문 내용 */}
          <DetailQuestionContent />

          {/* Gemini AI 답변 섹션 */}
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 3 }} />

            {/* AI 답변 로딩 중 */}
            {aiLoading && (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: themeColors.ai.bg,
                  border: `2px solid ${themeColors.ai.border}`,
                  textAlign: "center",
                }}
              >
                <CircularProgress
                  size={30}
                  sx={{ color: themeColors.ai.accent, mb: 2 }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: themeColors.ai.accent,
                    fontWeight: 600,
                  }}
                >
                  Gemini AI가 답변을 생성하고 있습니다...
                </Typography>
              </Paper>
            )}

            {/* AI 답변 완료 */}
            {aiAnswerGenerated && !aiLoading && (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: themeColors.ai.bg,
                  border: `2px solid ${themeColors.ai.border}`,
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <SmartToyIcon
                    sx={{
                      color: themeColors.ai.accent,
                      fontSize: "1.5rem",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: themeColors.ai.accent,
                      fontWeight: 600,
                    }}
                  >
                    Gemini AI 답변
                  </Typography>
                  {aiError && (
                    <Chip
                      label="오류 발생"
                      size="small"
                      color="error"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    color: themeColors.textPrimary,
                    lineHeight: 1.7,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {aiAnswer}
                </Typography>

                <Box
                  sx={{
                    mt: 2,
                    pt: 2,
                    borderTop: `1px solid ${alpha(themeColors.ai.border, 0.5)}`,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: themeColors.textSecondary,
                      fontStyle: "italic",
                    }}
                  >
                    * 이 답변은 Google Gemini AI에 의해 생성되었습니다.
                    참고용으로만 사용하시고, 실제 개발 시에는 공식 문서나 신뢰할
                    수 있는 자료를 확인해주세요.
                  </Typography>
                </Box>
              </Paper>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default MainContent;
