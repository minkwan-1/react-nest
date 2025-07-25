import { Box } from "@mui/material";
import { useEffect, useState, useRef, useCallback } from "react";
import { useAtom } from "jotai";
import { allQuestionsAtom } from "@atom/question";
import { HomePageTitle, SearchBar } from "@components/home/index";
import { ComponentWrapper } from "@components/layout/common";
import { QuestionPagination, QuestionList } from "./main/index";

interface User {
  id: number | string;
  name: string;
}

interface Question {
  id: number | string;
  title: string;
  content: string;
  likes?: number;
  thumbnail?: string;
  createdAt: string | Date;
  user: User;
  tags?: string[];
}

const MainContent = () => {
  const [allQuestions, setAllQuestions] = useAtom(allQuestionsAtom);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchAllQuestions = useCallback(
    async (page = 1, limit = 5, search = "") => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/questions?page=${page}&limit=${limit}&search=${encodeURIComponent(
            search
          )}`,
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
    },
    [setAllQuestions]
  );

  const handleSearchChange = (searchTerm: string) => {
    setSearchQuery(searchTerm);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setCurrentPage(1);
      fetchAllQuestions(1, 5, searchTerm);
    }, 500);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    fetchAllQuestions(value, 5, searchQuery);
  };

  useEffect(() => {
    fetchAllQuestions(1, 5, searchQuery);
  }, [fetchAllQuestions, searchQuery]);

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
      <ComponentWrapper sx={{ maxWidth: "1200px" }}>
        <HomePageTitle />
        <SearchBar onSearchChange={handleSearchChange} />
        <QuestionList
          questions={allQuestions as Question[]}
          loading={loading}
          currentPage={currentPage}
          searchQuery={searchQuery}
          fetchAllQuestions={fetchAllQuestions}
        />
        {allQuestions.length > 0 && (
          <QuestionPagination
            totalPages={totalPages}
            currentPage={currentPage}
            loading={loading}
            handlePageChange={handlePageChange}
          />
        )}
      </ComponentWrapper>
    </Box>
  );
};

export default MainContent;
