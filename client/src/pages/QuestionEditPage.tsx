import {
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
// 올바른 경로로 수정해야 할 수 있습니다.
import { PageContainer } from "../components/layout/common";
import { QuestionForm } from "../components/edit/QuestionForm";
// 올바른 경로로 수정해야 할 수 있습니다.
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
            {/* 헤더 */}
            <PageHeader
              title="질문 등록하기"
              subtitle="궁금한 점을 명확하게 작성하여 커뮤니티에서 도움을 받아보세요."
            />

            {/* 폼 */}
            <QuestionForm
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              tags={tags}
              setTags={setTags}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              // ✅ 아래 4개의 불필요한 props 전달을 제거하여 오류를 해결합니다.
              // handleTagsChange={handleTagsChange}
              // previewMode={previewMode}
              // setPreviewMode={setPreviewMode}
              // mainColor={mainColor}
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
