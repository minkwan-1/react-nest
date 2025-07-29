import {
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { PageContainer } from "../components/layout/common";
import { QuestionForm } from "../components/edit/QuestionForm";
import { PageHeader, useQuestionForm } from "@components/edit";

export default function QuestionEditPage() {
  const {
    title,
    setTitle,
    content,
    setContent,
    tags,
    setTags,
    isSubmitting,
    handleSubmit,
    dialog,
    setDialog,
  } = useQuestionForm();

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
            <PageHeader
              title="질문 등록하기"
              subtitle="궁금한 점을 명확하게 작성하여 커뮤니티에서 도움을 받아보세요."
            />

            <QuestionForm
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              tags={tags}
              setTags={setTags}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
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
