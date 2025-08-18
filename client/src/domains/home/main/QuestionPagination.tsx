import { Box, Pagination, useMediaQuery, useTheme } from "@mui/material";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
        size={isMobile ? "small" : "large"}
        showFirstButton
        showLastButton
        disabled={loading}
        siblingCount={1}
        boundaryCount={1}
      />
    </Box>
  );
};

export default QuestionPagination;
