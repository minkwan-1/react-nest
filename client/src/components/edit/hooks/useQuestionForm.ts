import { useState } from "react";
import axios from "axios";
import { imageService } from "../service/imageService";

interface UseQuestionFormProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useQuestionForm = ({
  onSuccess = () => {},
  onError = () => {},
}: UseQuestionFormProps = {}) => {
  // state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      });

      console.log("Question submitted:", response.data);
      alert("Question submitted successfully!");

      setTitle("");
      setContent("");
      setTags([]);
      onSuccess();
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("Failed to submit the question.");
      onError(error);
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
  };
};
