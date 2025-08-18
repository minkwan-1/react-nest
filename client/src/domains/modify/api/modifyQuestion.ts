import { axiosInstance } from "@api/axiosConfig";

interface ModifyQuestionParams {
  questionId: string;
  userId: string;
  title: string;
  content: string;
  tags: string[];
}

export const modifyQuestion = async ({
  questionId,
  userId,
  title,
  content,
  tags,
}: ModifyQuestionParams) => {
  const response = await axiosInstance.put(`questions/modify/${questionId}`, {
    title: title.trim(),
    content,
    tags,
    userId,
  });

  return response.data;
};
