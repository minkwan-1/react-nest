import { Box } from "@mui/material";
import { questionData } from "@mock/mockHomePageData";
import { useEffect } from "react";
import {
  HomePageTitle,
  SearchBar,
  FilteringButtons,
  QuestionCards,
} from "@components/home/index";

const MainContent = () => {
  useEffect(() => {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => {
        console.log("질문 데이터:", data);
      })
      .catch((err) => {
        console.error("질문 데이터 로딩 에러:", err);
      });
  }, []);

  return (
    <Box
      sx={{
        flex: 2,
        pr: { xs: "0", sm: "0", md: "3" },
        overflowY: "auto",
        height: "100%",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#F1F1F1",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#BDBDBD",
          borderRadius: "10px",
        },
      }}
    >
      {/* 1. title */}
      <HomePageTitle />

      {/* 2. search bar */}
      <SearchBar />

      {/* 3. filtering buttons */}
      <FilteringButtons />

      {/* 4. question cards */}
      {questionData.map((question) => (
        <QuestionCards key={question.id} question={question} />
      ))}
    </Box>
  );
};

export default MainContent;
