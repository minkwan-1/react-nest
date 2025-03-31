import { Box } from "@mui/material";
import { questionData } from "@mock/mockHomePageData";

import {
  HomePageTitle,
  SearchBar,
  FilteringButtons,
  QuestionCards,
} from "@components/home/index";

const MainContent = () => {
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
        <QuestionCards question={question} />
      ))}
    </Box>
  );
};

export default MainContent;
