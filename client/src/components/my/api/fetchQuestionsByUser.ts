import { API_URL } from "@api/axiosConfig";

export const fetchQuestionsByUser = async (userId: string) => {
  const res = await fetch(`${API_URL}questions/user/${userId}`);

  if (!res.ok) {
    throw new Error("사용자의 질문을 불러오는 데 실패했습니다.");
  }

  return res.json();
};
