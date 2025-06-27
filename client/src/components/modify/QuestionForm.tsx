import { Box, Paper, useTheme, alpha } from "@mui/material";
import {
  SectionTitle,
  TitleField,
  ContentInstruction,
  QuestionEditor,
  TagsField,
  ModifyQuestionSubmitButton,
} from "./index";

interface QuestionFormProps {
  handleSubmit: (e: React.FormEvent) => void;
  title: string;
  setTitle: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  tags: string[];
  handleTagsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  isFormValid: boolean;
}

const QuestionForm = ({
  handleSubmit,
  title,
  setTitle,
  content,
  setContent,
  tags,
  handleTagsChange,
  isSubmitting,
  isFormValid,
}: QuestionFormProps) => {
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
      <form onSubmit={handleSubmit}>
        {/* title area */}
        <Box sx={{ mb: 3 }}>
          <SectionTitle title="제목" />
          <TitleField title={title} setTitle={setTitle} />
        </Box>

        {/* content */}
        <Box sx={{ mb: 3 }}>
          <SectionTitle title="질문 내용" />

          <ContentInstruction />

          {/* Editor style wrapper */}
          <QuestionEditor content={content} setContent={setContent} />
        </Box>

        {/* tags */}
        <Box sx={{ mb: 3 }}>
          <SectionTitle title="태그" />

          <TagsField tags={tags} handleTagsChange={handleTagsChange} />
        </Box>

        {/* submit button */}
        <ModifyQuestionSubmitButton
          isSubmitting={isSubmitting}
          isFormValid={isFormValid}
        />
      </form>
    </Paper>
  );
};

export default QuestionForm;
