import {
  Answer,
  Question,
  AiAnswerResponse,
  SubmitAnswerRequest,
  FetchAnswersResponse,
  ApiResponse,
  User,
} from "../types";

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

export const aiService = {
  streamAiAnswer: ({
    questionId,
    onData,
    onComplete,
    onError,
  }: {
    questionId: number;
    onData: (chunk: string) => void;
    onComplete: (fullAnswerObject: Answer) => void;
    onError: (error: Error) => void;
  }): (() => void) => {
    const eventSource = new EventSource(
      `${API_BASE_URL}/api/ask-ai/stream/${questionId}`
    );

    eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);

        if (parsedData.type === "DATA") {
          onData(parsedData.payload);
        } else if (parsedData.type === "COMPLETE") {
          console.log("스트리밍 최종 데이터 수신:", parsedData.payload);
          onComplete(parsedData.payload);
          eventSource.close();
        }
      } catch (e) {
        console.error("SSE 데이터 파싱 실패:", e, "원본 데이터:", event.data);
        onError(new Error("서버로부터 유효하지 않은 데이터를 수신했습니다."));
        eventSource.close();
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      onError(
        new Error("스트리밍 중 오류가 발생했거나 연결이 종료되었습니다.")
      );
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  },

  getAiAnswer: async (questionId: number): Promise<Answer> => {
    try {
      const response = await apiRequest<ApiResponse<AiAnswerResponse>>(
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

export const questionService = {
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

export const userService = {
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

export const apiService = {
  answer: answerService,
  ai: aiService,
  question: questionService,
  user: userService,
};
