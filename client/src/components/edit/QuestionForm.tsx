import React, { Dispatch, SetStateAction } from "react";
import { Box, Paper, useTheme, alpha } from "@mui/material";
import {
  TitleField,
  ContentField,
  TagsField,
  PreviewButton,
  SubmitButton,
} from ".";
import { PreviewContent } from "./PreviewContent";

interface QuestionFormProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  tags: string[];
  handleTagsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewMode: boolean;
  setPreviewMode: Dispatch<SetStateAction<boolean>>;
  isSubmitting?: boolean;
  onSubmit: (e: React.FormEvent) => void;
  mainColor?: string;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  title,
  setTitle,
  content,
  setContent,
  tags,
  handleTagsChange,
  previewMode,
  setPreviewMode,
  isSubmitting = false,
  onSubmit,
  mainColor = "#c5a3d5",
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "16px",
        backgroundColor: isDarkMode ? alpha("#222", 0.7) : "#ffffff",
        boxShadow: isDarkMode
          ? "0 8px 20px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset"
          : "0 8px 30px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.02) inset",
        backdropFilter: "blur(10px)",
        padding: { xs: 2, sm: 4 },
        overflow: "hidden",
      }}
    >
      <form onSubmit={onSubmit}>
        <TitleField title={title} setTitle={setTitle} />

        {previewMode ? (
          <PreviewContent content={content} mainColor={mainColor} />
        ) : (
          <ContentField content={content} setContent={setContent} />
        )}

        <TagsField tags={tags} handleTagsChange={handleTagsChange} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 4,
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <PreviewButton
            previewMode={previewMode}
            setPreviewMode={setPreviewMode}
          />
          <SubmitButton isSubmitting={isSubmitting} />
        </Box>
      </form>
    </Paper>
  );
};
