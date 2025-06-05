import { realUserInfo } from "@atom/auth";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";

interface Question {
  id: number;
  title: string;
  content: string;
  tags: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface UseModifyQuestionProps {
  questionId: string | undefined;
}

interface UseModifyQuestionReturn {
  // 상태
  question: Question | null;
  loading: boolean;
  isSubmitting: boolean;

  // 폼 데이터
  title: string;
  content: string;
  tags: string[];

  // 액션
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setTags: (tags: string[]) => void;
  handleTagsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;

  // 유틸리티
  isFormValid: boolean;
}

export const useModifyQuestion = ({
  questionId,
}: UseModifyQuestionProps): UseModifyQuestionReturn => {
  // 기본 상태
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo] = useAtom(realUserInfo);

  console.log(userInfo?.id);

  // 폼 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // 질문 데이터 로드
  useEffect(() => {
    if (!questionId) return;

    const fetchQuestion = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/questions/${questionId}`
        );

        if (!response.ok) {
          throw new Error("질문을 불러올 수 없습니다.");
        }

        const data = await response.json();
        setQuestion(data);

        // 폼 상태 초기화
        setTitle(data.title);
        setContent(data.content);
        setTags(data.tags);
      } catch (error) {
        console.error("질문 로드 실패:", error);
        alert("질문을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId]);

  // 태그 변경 핸들러
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTags(
      input
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag)
    );
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ questionId, isFormValid });
    if (!questionId || !isFormValid) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:3000/questions/modify/${questionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title.trim(),
            content,
            tags: tags.filter((tag) => tag),
            userId: userInfo?.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("질문 수정에 실패했습니다.");
      }

      const updatedQuestion = await response.json();
      setQuestion(updatedQuestion);

      alert("질문이 성공적으로 수정되었습니다!");

      // 필요시 페이지 이동 로직을 여기서 처리하거나
      // 콜백으로 전달받아 처리할 수 있습니다
    } catch (error) {
      console.error("질문 수정 실패:", error);
      alert("질문 수정 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 폼 유효성 검사
  const isFormValid = title.trim().length > 0 && content.trim().length > 0;

  return {
    // 상태
    question,
    loading,
    isSubmitting,

    // 폼 데이터
    title,
    content,
    tags,

    // 액션
    setTitle,
    setContent,
    setTags,
    handleTagsChange,
    handleSubmit,

    // 유틸리티
    isFormValid,
  };
};
