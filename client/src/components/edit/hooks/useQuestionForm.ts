import { useState } from "react";
import axios from "axios";
import { imageService } from "../service/imageService";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";
import { questionsAtom } from "@atom/question";
import { useNavigate } from "react-router-dom";

// ✅ AI 요청 함수
const fetchAiAnswer = async ({
  title,
  content,
  questionId,
}: {
  title: string;
  content: string;
  questionId: string;
}) => {
  const params = new URLSearchParams({ title, content, questionId });

  const response = await fetch(
    `http://localhost:3000/api/ask-ai?${params.toString()}`
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "AI 답변 요청 실패");
  }

  const result = await response.json();
  return result.data; // { answer, generatedAt }
};

export const useQuestionForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [userInfo] = useAtom(realUserInfo);
  const [questions, setQuestions] = useAtom(questionsAtom);
  const [dialog, setDialog] = useState<{
    open: boolean;
    title: string;
    message: string;
  }>({
    open: false,
    title: "",
    message: "",
  });

  const navigate = useNavigate();

  // 태그 입력 핸들러
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTags(input.split(",").map((tag) => tag.trim()));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 이미지 처리
      const processedContent = await imageService.processContentImages(content);

      // 질문 등록
      const response = await axios.post("http://localhost:3000/questions", {
        title,
        content: processedContent,
        tags,
        userId: userInfo?.id,
      });

      const createdQuestion = response.data;

      // 상태 반영
      setQuestions([...questions, createdQuestion]);
      console.log("질문 id 체크: ", createdQuestion.id);

      // ✅ AI 요청
      const aiData = {
        title: createdQuestion.title,
        content: createdQuestion.content,
        questionId: createdQuestion.id,
      };

      console.log(aiData);

      try {
        const aiResponse = await fetchAiAnswer(aiData);
        console.log("AI 응답:", aiResponse);
        // 필요한 경우 여기에 저장 로직 추가
      } catch (error) {
        console.error("AI 생성 중 오류:", error);
      }

      // 폼 초기화 및 안내
      setTitle("");
      setContent("");
      setTags([]);

      setDialog({
        open: true,
        title: "질문 등록 완료",
        message: "질문이 성공적으로 등록되었습니다.",
      });

      navigate(`/questions/${createdQuestion.id}`);
    } catch (error) {
      console.error("Error submitting question:", error);

      setDialog({
        open: true,
        title: "오류 발생",
        message: "질문 등록 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setTags([]);
    setPreviewMode(false);
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    tags,
    setTags,
    previewMode,
    setPreviewMode,
    isSubmitting,
    handleTagsChange,
    handleSubmit,
    resetForm,
    dialog,
    setDialog,
  };
};
