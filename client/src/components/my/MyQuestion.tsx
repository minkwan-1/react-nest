import React from "react";
import { Box, Typography, Paper, useTheme } from "@mui/material";

// Import the CommonCard component
import CommonCard from "@components/common/Card";

export interface Question {
  id: number | string;
  title: string;
  content: string;
  tags: string[];
  userId: string;
}

interface MyQuestionProps {
  questionData: Question[];
  userData: {
    id: string | number;
    name: string;
  };
  onCardClick: (questionId: number | string) => void;
  onAnswerClick: (questionId: number | string) => void;
  onLikeClick: (questionId: number | string) => void;
  onBookmarkClick: (questionId: number | string) => void;
}

const MyQuestion: React.FC<MyQuestionProps> = ({
  questionData,
  userData,
  onCardClick,
  onAnswerClick,
  onLikeClick,
  onBookmarkClick,
}) => {
  const theme = useTheme();

  // Define theme colors for easy reference
  const themeColors = {
    cardBg: theme.palette.background.paper,
    border: theme.palette.mode === "light" ? "#e0e0e0" : "#333333",
  };

  // Korean content
  const koreanContent = {
    popularPosts: "나의 질문",
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 2,
        bgcolor: themeColors.cardBg,
        borderRadius: 2,
        boxShadow:
          theme.palette.mode === "light"
            ? "0 2px 12px rgba(0,0,0,0.04)"
            : "0 2px 12px rgba(0,0,0,0.2)",
        border:
          theme.palette.mode === "dark"
            ? `1px solid ${themeColors.border}`
            : "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {koreanContent.popularPosts}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {questionData.length > 0 ? (
          questionData.map((question) => (
            <CommonCard
              key={question.id}
              question={question}
              user={userData}
              onCardClick={onCardClick}
              onAnswerClick={onAnswerClick}
              onLikeClick={onLikeClick}
              onBookmarkClick={onBookmarkClick}
              showActions={true}
            />
          ))
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              아직 등록된 질문이 없습니다
            </Typography>
            <Typography variant="body2" color="text.secondary">
              첫 번째 질문을 등록해보세요!
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default MyQuestion;
