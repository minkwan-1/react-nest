import React, { Dispatch, SetStateAction } from "react";
import { Box, Paper } from "@mui/material";
import { TitleField, ContentField, TagsField, SubmitButton } from ".";

// 사용되지 않는 Props (previewMode, handleTagsChange 등)를 인터페이스에서 정리했습니다.
interface QuestionFormProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  isSubmitting?: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  title,
  setTitle,
  content,
  setContent,
  tags,
  setTags,
  isSubmitting = false,
  onSubmit,
}) => {
  return (
    <Paper
      elevation={0}
      sx={(theme) => ({
        // ✅ backgroundColor와 color를 제거하여 테마의 기본값을 사용하도록 합니다.
        // Paper의 기본 배경색은 theme.palette.background.paper를 따릅니다.
        borderRadius: "16px",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 8px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset"
            : "0 8px 24px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.03) inset",
        backdropFilter: "blur(10px)",
        padding: { xs: 2, sm: 4 },
        overflow: "hidden",
        transition: "background-color 0.3s ease, color 0.3s ease",
      })}
    >
      <form onSubmit={onSubmit}>
        <TitleField title={title} setTitle={setTitle} />
        <ContentField content={content} setContent={setContent} />
        <TagsField tags={tags} setTags={setTags} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mt: 4,
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <SubmitButton isSubmitting={isSubmitting} />
        </Box>
      </form>
    </Paper>
  );
};
