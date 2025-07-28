import { axiosInstance } from "@api/axiosConfig";

export const fetchQuestionsByUser = async (userId: string) => {
  const response = await axiosInstance.get(`questions/user/${userId}`);

  return response.data;
};
