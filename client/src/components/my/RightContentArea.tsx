import { Box } from "@mui/material";
import SelfIntroduction from "./SelfIntroduction";
import MyQuestion from "./MyQuestion";
import { useAtom } from "jotai";
import { questionsAtom } from "@atom/question";
import { realUserInfo } from "@atom/auth";
import { useNavigate } from "react-router-dom";

const RightContentArea = () => {
  const [questions] = useAtom(questionsAtom);
  const [userInfo] = useAtom(realUserInfo);
  const navigate = useNavigate();
  const questionData = questions || [];
  const userData = {
    id: userInfo?.id || 1,
    name: userInfo?.name || "minkwan won",
  };

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
      />
    </Box>
  );
};

export default RightContentArea;
