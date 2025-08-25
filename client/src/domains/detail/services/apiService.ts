// src/services/apiService.ts

// import { API_URL } from "@api/axiosConfig";
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
const API_BASE_URL = "http://localhost:3000"; // 실제 API 서버 주소로 사용됩니다.

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
  // [신규] AI 답변 스트리밍 요청 함수
  streamAiAnswer: ({
    questionId,
    onData,
    onComplete,
    onError,
  }: {
    questionId: number;
    onData: (chunk: string) => void;
    onComplete: (fullText: string) => void;
    onError: (error: Error) => void;
  }): (() => void) => {
    const eventSource = new EventSource(
      `${API_BASE_URL}/api/ask-ai/stream/${questionId}`
    );

    console.log(eventSource);

    let fullAnswer = "";

    eventSource.onmessage = (event) => {
      const chunk = event.data;
      console.log("청크 확인: ", chunk);
      fullAnswer += chunk;
      onData(chunk);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      // 서버가 정상적으로 연결을 닫아도 onerror가 호출됩니다.
      // 실제 에러와 정상 종료를 구분하려면 서버에서 별도 시그널을 보내는 것이 좋습니다.
      onError(
        new Error("스트리밍 중 오류가 발생했거나 연결이 종료되었습니다.")
      );
      onComplete(fullAnswer);
      eventSource.close();
    };

    // 연결을 수동으로 닫는 함수를 반환합니다.
    return () => {
      eventSource.close();
    };
  },

  // AI 답변 요청 (기존 단일 요청 방식, 필요시 사용)
  getAiAnswer: async (questionId: number): Promise<Answer> => {
    try {
      const response = await apiRequest<ApiResponse<AiAnswerResponse>>(
        // API_URL을 API_BASE_URL로 통일했습니다. 환경에 맞게 수정해주세요.
        `${API_BASE_URL}/api/ask-ai/${questionId}`
      );

      return {
        id: "ai-answer",
        questionId: questionId.toString(),
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

  // AI 답변 재생성 (기존 단일 요청 방식, 필요시 사용)
  regenerateAiAnswer: async (question: Question): Promise<Answer> => {
    // 이 함수도 스트리밍으로 변경하려면 streamAiAnswer와 유사한 로직이 필요합니다.
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
