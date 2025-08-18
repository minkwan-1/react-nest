// hooks/useAnswers.ts
import { useState, useEffect, useCallback } from "react";
import { Answer, UseAnswersReturn } from "../types";
import { apiService } from "../services/apiService";

export const useAnswers = (
  questionId: string | undefined
): UseAnswersReturn => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [answersLoading, setAnswersLoading] = useState(true);
  const [answersError, setAnswersError] = useState<string | null>(null);

  const fetchAnswers = useCallback(async () => {
    if (!questionId) return;

    setAnswersLoading(true);
    setAnswersError(null);

    try {
      const data = await apiService.answer.fetchAnswersByQuestionId(questionId);
      setAnswers(data);
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
  }, [questionId]);

  useEffect(() => {
    if (questionId) {
      fetchAnswers();
    }
  }, [questionId, fetchAnswers]);

  return {
    answers,
    answersLoading,
    answersError,
    fetchAnswers,
  };
};
