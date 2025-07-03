// hooks/useAiAnswer.ts
import { useState, useCallback } from "react";
import { Answer, UseAiAnswerReturn } from "../types";
import { apiService } from "../services/apiService";

export const useAiAnswer = (): UseAiAnswerReturn => {
  const [aiAnswer, setAiAnswer] = useState<Answer | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const fetchAiAnswer = useCallback(async (questionId: number) => {
    if (!questionId) return;

    setAiLoading(true);
    setAiError(null);

    try {
      const aiAnswerData = await apiService.ai.getAiAnswer(questionId); // ✅
      setAiAnswer(aiAnswerData);
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
  }, []);

  return {
    aiAnswer,
    aiLoading,
    aiError,
    fetchAiAnswer,
  };
};
