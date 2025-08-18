import { Box, Paper, IconButton, Tooltip } from "@mui/material";
import {
  SectionTitle,
  TitleField,
  ContentInstruction,
  QuestionEditor,
  TagsField,
  ModifyQuestionSubmitButton,
  EditPreview,
} from "./index";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useModifyPreview } from "./hooks";

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
  createdDate: string | undefined;
  author: string | undefined;
  authorProfileImage: string | undefined;
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
  createdDate,
  author,
  authorProfileImage,
}: QuestionFormProps) => {
  const { isPreviewOpen, handlePreviewOpen, handlePreviewClose } =
    useModifyPreview();

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

            <ModifyQuestionSubmitButton
              isSubmitting={isSubmitting}
              isFormValid={isFormValid}
            />
          </Box>
        </form>
      </Paper>
      <EditPreview
        isPreviewOpen={isPreviewOpen}
        handlePreviewClose={handlePreviewClose}
        title={title}
        content={content}
        tags={tags}
        createdDate={createdDate}
        author={author}
        authorProfileImage={authorProfileImage}
        // previewDate={previewDate}
        // userId={userId}
      />
    </>
  );
};

export default QuestionForm;
