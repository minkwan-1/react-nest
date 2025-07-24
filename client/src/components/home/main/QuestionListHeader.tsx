import { Box, Typography } from "@mui/material";

interface QuestionListHeaderProps {
  totalQuestions: number;
  currentPage: number;
  totalPages: number;
}

const QuestionListHeader = ({
  totalQuestions,
  currentPage,
  totalPages,
}: QuestionListHeaderProps) => {
  return (
    <Box sx={{ mt: 2, mb: 1 }}>
      <Typography variant="body2" color="text.secondary">
        총 {totalQuestions}개의 질문 (페이지 {currentPage} / {totalPages})
      </Typography>
    </Box>
  );
};

export default QuestionListHeader;
