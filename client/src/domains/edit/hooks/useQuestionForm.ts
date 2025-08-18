import { useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { imageService } from "../service/imageService";
import { realUserInfo } from "@atom/auth";
import { questionsAtom } from "@atom/question";
import { axiosInstance } from "@api/axiosConfig";

// 질문 생성 API
const createQuestion = async ({
  title,
  content,
  tags,
  userId,
}: {
  title: string;
  content: string;
  tags: string[];
  userId: string;
}) => {
  const processedContent = await imageService.processContentImages(content);

  const response = await axiosInstance.post("questions", {
    title,
    content: processedContent,
    tags,
    userId,
  });
  return response.data;
};

export const useQuestionForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  const [userInfo] = useAtom(realUserInfo);
  const [question, setQuestions] = useAtom(questionsAtom);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [dialog, setDialog] = useState<{
    open: boolean;
    title: string;
    message: string;
  }>({
    open: false,
    title: "",
    message: "",
  });

  const { mutate: submitQuestion, isPending: isSubmitting } = useMutation({
    mutationFn: createQuestion,
    onSuccess: async (createdQuestion) => {
      // 질문 목록 관련 쿼리를 무효화하여 다른 페이지에서 최신 목록을 볼 수 있도록 합니다.
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      setQuestions((prev) => [...prev, createdQuestion]);

      setDialog({
        open: true,
        title: "질문 등록 완료",
        message: "질문이 성공적으로 등록되었습니다.",
      });

      resetForm();
      navigate(`/questions/${createdQuestion.id}`);
    },
    onError: (error) => {
      console.error("Error submitting question:", error);
      setDialog({
        open: true,
        title: "오류 발생",
        message: "질문 등록 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
    },
  });

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTags(input.split(",").map((tag) => tag.trim()));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo?.user.id) return;

    submitQuestion({
      title,
      content,
      tags,
      userId: userInfo?.user.id,
    });
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
    question,
  };
};
