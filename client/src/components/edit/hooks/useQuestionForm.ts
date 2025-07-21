import { useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { imageService } from "../service/imageService";
import { realUserInfo } from "@atom/auth";
import { questionsAtom } from "@atom/question";
import { API_URL } from "@api/axiosConfig";

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

  const response = await fetch(`${API_URL}questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content: processedContent,
      tags,
      userId,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

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
  const response = await fetch(`${API_URL}api/ask-ai?${params.toString()}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "AI 답변 요청 실패");
  }

  const result = await response.json();
  return result.data;
};

export const useQuestionForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  const [userInfo] = useAtom(realUserInfo);
  const [, setQuestions] = useAtom(questionsAtom);
  const navigate = useNavigate();

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
    onSuccess: (createdQuestion) => {
      setQuestions((prev) => [...prev, createdQuestion]);

      fetchAiAnswer({
        title: createdQuestion.title,
        content: createdQuestion.content,
        questionId: createdQuestion.id,
      })
        .then((aiResponse) => console.log("AI 응답:", aiResponse))
        .catch((error) => console.error("AI 생성 중 오류:", error));

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
    if (!userInfo?.id) return;

    submitQuestion({
      title,
      content,
      tags,
      userId: userInfo.id,
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
  };
};
