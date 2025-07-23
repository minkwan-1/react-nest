import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { allQuestionsAtom } from "@atom/question";
import { HomePageTitle, SearchBar } from "@components/home/index";

// 유틸: HTML 태그 제거
const stripHtml = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

// 유틸: 날짜 포맷
const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const MainContent = () => {
  const [allQuestions, setAllQuestions] = useAtom(allQuestionsAtom);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchAllQuestions = async (page: number = 1, limit: number = 5) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/questions?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      setAllQuestions(data.items);
      setTotalPages(data.totalPages);
      setTotalQuestions(data.total);
      setCurrentPage(data.page);
    } catch (e) {
      console.log("에러 발생:", e);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    fetchAllQuestions(value);
  };

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  return (
    <Box
      sx={{
        flex: 2,
        pr: { xs: "0", sm: "0", md: "3" },
        overflowY: "auto",
        height: "100%",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": { width: "6px" },
        "&::-webkit-scrollbar-track": { backgroundColor: "#F1F1F1" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#BDBDBD",
          borderRadius: "10px",
        },
      }}
    >
      <HomePageTitle />
      <SearchBar />

      {/* 질문 개수 표시 */}
      <Box sx={{ mt: 2, mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          총 {totalQuestions}개의 질문 (페이지 {currentPage} / {totalPages})
        </Typography>
      </Box>

      {/* 질문 목록 */}
      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        {loading ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              로딩 중...
            </Typography>
          </Box>
        ) : allQuestions.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              등록된 질문이 없습니다.
            </Typography>
          </Box>
        ) : (
          <>
            {allQuestions.map((question) => (
              <Card key={question.id} variant="outlined" sx={{ p: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {question.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {stripHtml(question.content)}
                  </Typography>

                  <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
                    {question.tags.map((tag: string) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                  </Stack>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    mt={1}
                    display="block"
                  >
                    작성자: {question.user.name} ·{" "}
                    {formatDate(question.createdAt)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </Box>

      {allQuestions.length > 0 && (
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
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            disabled={loading}
          />
        </Box>
      )}
    </Box>
  );
};

export default MainContent;
