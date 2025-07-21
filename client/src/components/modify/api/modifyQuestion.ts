import { API_URL } from "@api/axiosConfig";

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
  const response = await fetch(`${API_URL}questions/modify/${questionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title.trim(),
      content,
      tags,
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error("질문 수정에 실패했습니다.");
  }
  return response.json();
};
