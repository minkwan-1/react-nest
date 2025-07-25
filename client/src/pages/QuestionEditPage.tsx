import { Box, Container } from "@mui/material";
import { PageContainer } from "../components/layout/common";
import { QuestionForm } from "../components/edit/QuestionForm";
import { PageHeader, useQuestionForm } from "@components/edit";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

export default function QuestionEditPage() {
  const mainColor = "#b8dae1";
  const {
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
    dialog,
    setDialog,
  } = useQuestionForm();
  //   {
  //   onSuccess: () => {
  //     // 성공 시 추가 작업을 수행할 수 있음 (ex: 리다이렉트)
  //   },
  // }

  return (
    <>
      <PageContainer>
        <Container maxWidth="lg" disableGutters>
          <Box
            sx={{
              position: "relative",
              padding: { xs: 2, sm: 3 },
              maxWidth: 1200,
              mx: "auto",
              zIndex: 1,
            }}
          >
            {/* 헤더 */}
            <PageHeader
              title="질문 등록하기"
              subtitle="궁금한 점을 명확하게 작성하여 커뮤니티에서 도움을 받아보세요."
              mainColor={mainColor}
            />

            {/* 폼 */}
            <QuestionForm
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              tags={tags}
              setTags={setTags}
              handleTagsChange={handleTagsChange}
              previewMode={previewMode}
              setPreviewMode={setPreviewMode}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              mainColor={mainColor}
            />
          </Box>
        </Container>
      </PageContainer>
      <Dialog
        open={dialog.open}
        onClose={() => setDialog({ ...dialog, open: false })}
      >
        <DialogTitle>{dialog.title}</DialogTitle>
        <DialogContent>{dialog.message}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialog({ ...dialog, open: false })}
            autoFocus
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
