import { API_URL } from "@api/axiosConfig";

export const fetchQuestionDetail = async (questionId: string) => {
  const response = await fetch(`${API_URL}questions/${questionId}`);
  if (!response.ok) {
    throw new Error("질문을 불러오는 데 실패했습니다.");
  }
  return response.json();
};
