import { axiosInstance } from "@api/axiosConfig";

export const fetchQuestionDetail = async (questionId: string) => {
  const response = await axiosInstance.get(`questions/${questionId}`);
  return response.data;
};
