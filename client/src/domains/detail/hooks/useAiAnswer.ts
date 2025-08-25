import { useState, useCallback, useRef } from "react";
import { Answer, UseAiAnswerReturn } from "../types";
import { apiService } from "../services/apiService";

export const useAiAnswer = (): UseAiAnswerReturn => {
  const [aiAnswer, setAiAnswer] = useState<Answer | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const streamRef = useRef<(() => void) | null>(null);

  const fetchAiAnswer = useCallback(async (questionId: number) => {
    if (!questionId) return;

    if (streamRef.current) {
      streamRef.current();
    }

    setAiLoading(true);
    setAiError(null);
    setAiAnswer(null);

    const closeStream = apiService.ai.streamAiAnswer({
      questionId,
      onData: (chunk) => {
        setAiLoading(false);

        setAiAnswer((prev) => {
          if (!prev) {
            const now = new Date().toISOString();
            return {
              id: "ai-answer-streaming",
              questionId: questionId.toString(),
              userId: "ai-assistant",
              content: chunk,
              createdAt: now,
              updatedAt: now,
              isAiAnswer: true,
            };
          }
          return {
            ...prev,
            content: prev.content + chunk,
          };
        });
      },
      onComplete: (finalAnswer) => {
        console.log("스트리밍 최종 완료, 상태 업데이트:", finalAnswer);
        setAiAnswer({
          ...finalAnswer,
          isAiAnswer: true,
        });
        setAiLoading(false);
        streamRef.current = null;
      },
      onError: (error) => {
        setAiError(error.message);
        setAiLoading(false);
      },
    });

    streamRef.current = closeStream;
  }, []);

  return {
    aiAnswer,
    aiLoading,
    aiError,
    fetchAiAnswer,
  };
};
