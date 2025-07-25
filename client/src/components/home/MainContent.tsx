import { Box } from "@mui/material";
import { useState, useRef } from "react";
import { HomePageTitle, SearchBar } from "@components/home/index";
import { ComponentWrapper } from "@components/layout/common";
import { QuestionPagination, QuestionList } from "./main/index";
import { useQuestions } from "./hooks/useQuestions";

const MainContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data, isLoading } = useQuestions(currentPage, 5, searchQuery);

  const handleSearchChange = (searchTerm: string) => {
    setSearchQuery(searchTerm);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setCurrentPage(1); // 검색 시 첫 페이지로 이동
    }, 500);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

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
          questions={data?.items || []}
          loading={isLoading}
          currentPage={currentPage}
          searchQuery={searchQuery}
        />
        {(data?.items?.length ?? 0) > 0 && (
          <QuestionPagination
            totalPages={data?.totalPages || 1}
            currentPage={currentPage}
            loading={isLoading}
            handlePageChange={handlePageChange}
          />
        )}
      </ComponentWrapper>
    </Box>
  );
};

export default MainContent;
