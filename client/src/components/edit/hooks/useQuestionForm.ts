import { useState } from "react";
import axios from "axios";
import { imageService } from "../service/imageService";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";
import { questionsAtom } from "@atom/question";
import { useNavigate } from "react-router-dom";

// interface UseQuestionFormProps {
//   onSuccess?: () => void;
//   onError?: (error: unknown) => void;
// }

export const useQuestionForm = () => {
  // state
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

  console.log(userInfo);
  console.log(questions);

  // 태그 입력 변경 핸들러
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTags(input.split(",").map((tag) => tag.trim()));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const processedContent = await imageService.processContentImages(content);

      const response = await axios.post("http://localhost:3000/questions", {
        title,
        content: processedContent,
        tags,
        userId: userInfo?.id,
      });

      // 응답을 전역 상태에 저장 (localStorage에 자동 저장됨)
      setQuestions([...questions, response.data]);
      console.log("질문 id 체크: ", response.data.id);

      // alert("Question submitted successfully!");

      setTitle("");
      setContent("");
      setTags([]);

      setDialog({
        open: true,
        title: "질문 등록 완료",
        message: "질문이 성공적으로 등록되었습니다.",
      });

      // 질문 등록 완료 후 navigate
      navigate(`/questions/${response.data.id}`);
      // onSuccess();
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

  // 폼 리셋 함수
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
