import { Answer, SubmitAnswerRequest, FetchAnswersResponse } from "../types";

const API_BASE_URL = "http://localhost:3000";

const handleApiError = (error: unknown, fallbackMessage: string): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return fallbackMessage;
};

const apiRequest = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        `서버 오류: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

export const answerService = {
  fetchAnswersByQuestionId: async (questionId: string): Promise<Answer[]> => {
    try {
      return await apiRequest<FetchAnswersResponse>(
        `${API_BASE_URL}/answers/question/${questionId}`
      );
    } catch (error) {
      throw new Error(
        handleApiError(error, "답변을 불러오는 중 오류가 발생했습니다.")
      );
    }
  },

  submitAnswer: async (answerData: SubmitAnswerRequest): Promise<Answer> => {
    try {
      return await apiRequest<Answer>(`${API_BASE_URL}/answers`, {
        method: "POST",
        body: JSON.stringify(answerData),
      });
    } catch (error) {
      throw new Error(
        handleApiError(error, "답변 등록 중 오류가 발생했습니다.")
      );
    }
  },
};

export const apiService = {
  answer: answerService,
};
