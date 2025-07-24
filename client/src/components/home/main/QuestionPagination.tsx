import { Box, Pagination } from "@mui/material";

interface QuestionPaginationProps {
  totalPages: number;
  currentPage: number;
  loading: boolean;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const QuestionPagination = ({
  totalPages,
  currentPage,
  loading,
  handlePageChange,
}: QuestionPaginationProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 4,
        mb: 2,
      }}
    >
      <Pagination
        count={Math.max(totalPages, 1)}
        page={currentPage}
        onChange={handlePageChange}
        size="large"
        showFirstButton
        showLastButton
        disabled={loading}
      />
    </Box>
  );
};

export default QuestionPagination;
