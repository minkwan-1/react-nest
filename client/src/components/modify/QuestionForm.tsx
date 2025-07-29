import { Box, Paper } from "@mui/material";
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
  setTags: (tags: string[]) => void;
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
  setTags,
  isSubmitting,
  isFormValid,
}: QuestionFormProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        backdropFilter: "blur(10px)",
        overflow: "hidden",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 3 }}>
          <SectionTitle title="제목" />
          <TitleField title={title} setTitle={setTitle} />
        </Box>

        <Box sx={{ mb: 3 }}>
          <SectionTitle title="질문 내용" />

          <ContentInstruction />

          <QuestionEditor content={content} setContent={setContent} />
        </Box>

        <Box sx={{ mb: 3 }}>
          <TagsField tags={tags} setTags={setTags} />
        </Box>

        <ModifyQuestionSubmitButton
          isSubmitting={isSubmitting}
          isFormValid={isFormValid}
        />
      </form>
    </Paper>
  );
};

export default QuestionForm;
