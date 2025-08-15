// MainContent.tsx
import { Box } from "@mui/material";
import { useState, useRef } from "react";
import { HomePageTitle, SearchBar, NewsSlider } from "@components/home/index";
import { ComponentWrapper } from "@components/layout/common";
import { QuestionPagination, QuestionList } from "./main/index";
import { useQuestions } from "./hooks/useQuestions";

const MainContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data, isLoading } = useQuestions(currentPage, 5, searchQuery);

  const handleSearchChange = (searchTerm: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setSearchQuery(searchTerm);
      setCurrentPage(1);
    }, 500);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  console.log("페이지네이션 데이터: ", data);

  return (
    <Box
      sx={{
        flex: 2,
        pr: { xs: "0", sm: "0", md: "3" },
        overflowY: "auto",
        height: "100%",
      }}
    >
      <ComponentWrapper sx={{ maxWidth: "1200px" }}>
        <NewsSlider />
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
