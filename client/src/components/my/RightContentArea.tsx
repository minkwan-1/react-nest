import { Box } from "@mui/material";
import SelfIntroduction from "./SelfIntroduction";
import MyQuestion from "./MyQuestion";
import { useAtom } from "jotai";
import { questionsAtom } from "@atom/question";
import { realUserInfo } from "@atom/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const RightContentArea = () => {
  const [questions] = useAtom(questionsAtom);
  const [userInfo] = useAtom(realUserInfo);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const questionData = questions || [];
  const userData = {
    id: userInfo?.id || 1,
    name: userInfo?.name || "minkwan won",
  };

  // 초기 로딩 시뮬레이션 (실제로는 데이터 로딩 상태에 따라 결정)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (questionId: number | string) => {
    console.log("Card clicked:", questionId);
    navigate(`/questions/${questionId}`);
  };

  const handleAnswerClick = (questionId: number | string) => {
    console.log("Answer clicked:", questionId);
  };

  return (
    <Box sx={{ flex: 1, p: 0, borderRadius: 2, overflowY: "scroll" }}>
      <SelfIntroduction />

      <MyQuestion
        questionData={questionData}
        userData={userData}
        onCardClick={handleCardClick}
        onAnswerClick={handleAnswerClick}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default RightContentArea;
