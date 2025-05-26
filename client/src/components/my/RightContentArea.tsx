import { Box, Grid } from "@mui/material";
import SelfIntroduction from "./SelfIntroduction";
import ServiceIntroduction from "./ServiceIntroduction";
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

  // Event handlers for CommonCard
  const handleCardClick = (questionId: number | string) => {
    console.log("Card clicked:", questionId);
    navigate(`/questions/${questionId}`);
    // Add navigation logic here
  };

  const handleAnswerClick = (questionId: number | string) => {
    console.log("Answer clicked:", questionId);
    // Add answer logic here
  };

  const handleLikeClick = (questionId: number | string) => {
    console.log("Like clicked:", questionId);
    // Add like logic here
  };

  const handleBookmarkClick = (questionId: number | string) => {
    console.log("Bookmark clicked:", questionId);
    // Add bookmark logic here
  };
  return (
    <Box sx={{ flex: 1, p: 0, borderRadius: 2 }}>
      {/* Content Sections */}
      <Box>
        <Grid spacing={2}>
          <Grid item xs={14} md={8}>
            {/* Self Introduction Section */}
            <SelfIntroduction />

            {/* Service Introduction Section */}
            <ServiceIntroduction />

            {/* My Questions Section - Now using separated component */}
            <MyQuestion
              questionData={questionData}
              userData={userData}
              onCardClick={handleCardClick}
              onAnswerClick={handleAnswerClick}
              onLikeClick={handleLikeClick}
              onBookmarkClick={handleBookmarkClick}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RightContentArea;
