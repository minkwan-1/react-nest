// services/apiService.ts
import {
  Answer,
  Question,
  AiAnswerResponse,
  SubmitAnswerRequest,
  FetchAnswersResponse,
  ApiResponse,
  User,
} from "../types";

// 기본 API 설정
const API_BASE_URL = "http://localhost:3000";

// 공통 에러 처리 함수
const handleApiError = (error: unknown, fallbackMessage: string): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return fallbackMessage;
};

// 공통 fetch 래퍼
const apiRequest = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, {
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

// 답변 관련 API
export const answerService = {
  // 특정 질문의 답변 목록 가져오기
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

  // 새 답변 제출
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

  // 답변 수정
  updateAnswer: async (answerId: string, content: string): Promise<Answer> => {
    try {
      return await apiRequest<Answer>(`${API_BASE_URL}/answers/${answerId}`, {
        method: "PUT",
        body: JSON.stringify({ content }),
      });
    } catch (error) {
      throw new Error(
        handleApiError(error, "답변 수정 중 오류가 발생했습니다.")
      );
    }
  },

  // 답변 삭제
  deleteAnswer: async (answerId: string): Promise<void> => {
    try {
      await apiRequest<void>(`${API_BASE_URL}/answers/${answerId}`, {
        method: "DELETE",
      });
    } catch (error) {
      throw new Error(
        handleApiError(error, "답변 삭제 중 오류가 발생했습니다.")
      );
    }
  },
};

// AI 답변 관련 API
export const aiService = {
  // AI 답변 요청
  getAiAnswer: async (question: Question): Promise<Answer> => {
    try {
      const queryParams = new URLSearchParams({
        title: question.title,
        content: question.content,
      });

      const response = await apiRequest<ApiResponse<AiAnswerResponse>>(
        `${API_BASE_URL}/api/ask-ai?${queryParams}`
      );

      // AI 답변을 Answer 형태로 변환
      return {
        id: "ai-answer",
        questionId: question.id.toString(),
        userId: "ai-assistant",
        content: response.data.answer,
        createdAt: response.data.generatedAt,
        updatedAt: response.data.generatedAt,
        isAiAnswer: true,
      };
    } catch (error) {
      throw new Error(
        handleApiError(error, "AI 답변을 불러오는 중 오류가 발생했습니다.")
      );
    }
  },

  // AI 답변 재생성
  regenerateAiAnswer: async (question: Question): Promise<Answer> => {
    try {
      const queryParams = new URLSearchParams({
        title: question.title,
        content: question.content,
        regenerate: "true",
      });

      const response = await apiRequest<ApiResponse<AiAnswerResponse>>(
        `${API_BASE_URL}/api/ask-ai?${queryParams}`
      );

      return {
        id: `ai-answer-${Date.now()}`,
        questionId: question.id.toString(),
        userId: "ai-assistant",
        content: response.data.answer,
        createdAt: response.data.generatedAt,
        updatedAt: response.data.generatedAt,
        isAiAnswer: true,
      };
    } catch (error) {
      throw new Error(
        handleApiError(error, "AI 답변 재생성 중 오류가 발생했습니다.")
      );
    }
  },
};

// 질문 관련 API (필요한 경우)
export const questionService = {
  // 질문 상세 정보 가져오기
  fetchQuestionById: async (questionId: string): Promise<Question> => {
    try {
      return await apiRequest<Question>(
        `${API_BASE_URL}/questions/${questionId}`
      );
    } catch (error) {
      throw new Error(
        handleApiError(error, "질문을 불러오는 중 오류가 발생했습니다.")
      );
    }
  },

  // 질문 목록 가져오기
  fetchQuestions: async (page = 1, limit = 10): Promise<Question[]> => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      return await apiRequest<Question[]>(
        `${API_BASE_URL}/questions?${queryParams}`
      );
    } catch (error) {
      throw new Error(
        handleApiError(error, "질문 목록을 불러오는 중 오류가 발생했습니다.")
      );
    }
  },

  // 새 질문 생성
  createQuestion: async (
    questionData: Omit<Question, "id" | "user">
  ): Promise<Question> => {
    try {
      return await apiRequest<Question>(`${API_BASE_URL}/questions`, {
        method: "POST",
        body: JSON.stringify(questionData),
      });
    } catch (error) {
      throw new Error(
        handleApiError(error, "질문 생성 중 오류가 발생했습니다.")
      );
    }
  },
};

// 사용자 관련 API (필요한 경우)
export const userService = {
  // 사용자 정보 가져오기
  fetchUserById: async (userId: string): Promise<User> => {
    try {
      return await apiRequest<User>(`${API_BASE_URL}/users/${userId}`);
    } catch (error) {
      throw new Error(
        handleApiError(error, "사용자 정보를 불러오는 중 오류가 발생했습니다.")
      );
    }
  },
};

// 통합 API 서비스 객체
export const apiService = {
  answer: answerService,
  ai: aiService,
  question: questionService,
  user: userService,
};
