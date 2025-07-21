import { useState } from "react";
import { API_URL } from "@api/axiosConfig";
export const useModifyQuestionSubmit = (
  questionId: string | undefined,
  userId: string | undefined,
  formData: {
    title: string;
    content: string;
    tags: string[];
  }
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionId) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}questions/modify/${questionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title.trim(),
          content: formData.content,
          tags: formData.tags,
          userId,
        }),
      });

      if (!res.ok) throw new Error("질문 수정 실패");

      const updated = await res.json();
      alert("질문이 성공적으로 수정되었습니다!");
      return updated;
    } catch (err) {
      console.error(err);
      alert("질문 수정 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting };
};
