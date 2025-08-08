import React, { Dispatch, SetStateAction } from "react";
import { Box, Paper, IconButton, Tooltip } from "@mui/material";
import {
  TitleField,
  ContentField,
  TagsField,
  SubmitButton,
  PreviewDialog,
} from ".";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { usePreviewDialog } from "./hooks/usePreviewDialog";

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
  const { isPreviewOpen, handlePreviewOpen, handlePreviewClose } =
    usePreviewDialog();

  const isPreviewDisabled =
    !title.trim() || !content.trim() || tags.length === 0;

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          backdropFilter: "blur(10px)",
          overflow: "hidden",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        <form onSubmit={onSubmit}>
          <TitleField title={title} setTitle={setTitle} />
          <ContentField content={content} setContent={setContent} />
          <TagsField tags={tags} setTags={setTags} />
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
            <Tooltip
              title={
                isPreviewDisabled
                  ? "제목, 내용, 태그를 모두 입력해야 미리보기가 가능합니다."
                  : "미리보기"
              }
            >
              <span>
                <IconButton
                  onClick={handlePreviewOpen}
                  aria-label="미리보기"
                  disabled={isPreviewDisabled}
                >
                  <VisibilityIcon />
                </IconButton>
              </span>
            </Tooltip>
            <SubmitButton isSubmitting={isSubmitting} />
          </Box>
        </form>
      </Paper>
      <PreviewDialog
        isPreviewOpen={isPreviewOpen}
        handlePreviewClose={handlePreviewClose}
        title={title}
        content={content}
        tags={tags}
      />
    </>
  );
};
