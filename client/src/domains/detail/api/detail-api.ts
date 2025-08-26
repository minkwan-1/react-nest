import axios from "axios";
import { axiosInstance } from "@api/axiosConfig";

export type Answer = {
  id: string;
  questionId: string | undefined;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isAiAnswer?: boolean;
};

export type SubmitAnswerRequest = {
  questionId: string;
  content: string;
  userId: string;
};

export const fetchAnswersByQuestionId = async (
  questionId: string | undefined
): Promise<Answer[]> => {
  try {
    const response = await axiosInstance.get<Answer[]>(
      `/answers/question/${questionId}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "답변을 불러오는 중 오류가 발생했습니다."
      );
    }
    throw new Error("서버와 통신 중 오류가 발생했습니다.");
  }
};

export const submitAnswer = async (
  answerData: SubmitAnswerRequest
): Promise<Answer> => {
  try {
    const response = await axiosInstance.post<Answer>("/answers", answerData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("답변 등록 중 오류가 발생했습니다.");
  }
};
