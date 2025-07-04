import { Box } from "@mui/material";
import { HomePageTitle, SearchBar } from "@components/home/index";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { allQuestionsAtom } from "@atom/question";
// import { realUserInfo } from "@atom/auth";

const MainContent = () => {
  const [allQuestions, setAllQuestions] = useAtom(allQuestionsAtom);
  // const [userInfo] = useAtom(realUserInfo);

  const fetchAllQuestions = async () => {
    try {
      const response = await fetch("http://localhost:3000/questions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setAllQuestions(data);

      console.log("fetchAllQuestions Data: ", data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  console.log("전역 상태에 저장된 fetchAllQuestions Data: ", allQuestions);

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

      {/* 3. question cards */}
    </Box>
  );
};

export default MainContent;
