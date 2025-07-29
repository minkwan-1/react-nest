import React, { Dispatch, SetStateAction } from "react";
import { Box, Paper } from "@mui/material";
import { TitleField, ContentField, TagsField, SubmitButton } from ".";

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
      sx={{
        // borderRadius: "16px",
        backdropFilter: "blur(10px)",
        // padding: { xs: 2, sm: 4 },
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
