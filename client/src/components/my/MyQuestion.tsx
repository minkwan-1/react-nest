import React from "react";
import { Box, Typography, Paper, useTheme, Skeleton } from "@mui/material";
// import { useQuestionCard } from "@components/common/card/hooks/useQuestionCard";

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
  isLoading?: boolean;
}

// 스켈레톤 카드 컴포넌트
const QuestionCardSkeleton = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "#333333",
        border: theme.palette.mode === "light" ? "1px solid #F0F0F0" : "none",
        p: 3,
      }}
    >
      {/* Header Skeleton */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Skeleton variant="circular" width={32} height={32} sx={{ mr: 1.5 }} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="30%" height={20} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="20%" height={16} />
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
        {/* Content Skeleton */}
        <Box sx={{ flex: 1 }}>
          {/* Title Skeleton */}
          <Skeleton variant="text" width="80%" height={28} sx={{ mb: 1 }} />

          {/* Content Skeleton */}
          <Skeleton variant="text" width="100%" height={20} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="70%" height={20} sx={{ mb: 2.5 }} />

          {/* Actions Skeleton */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Skeleton
              variant="rounded"
              width={60}
              height={32}
              sx={{ borderRadius: 1 }}
            />
            <Skeleton
              variant="rounded"
              width={60}
              height={32}
              sx={{ borderRadius: 1 }}
            />
          </Box>
        </Box>

        {/* Thumbnail Skeleton */}
        <Skeleton
          variant="rounded"
          width={120}
          height={80}
          sx={{ borderRadius: 1 }}
        />
      </Box>
    </Box>
  );
};

const MyQuestion: React.FC<MyQuestionProps> = ({
  questionData,
  userData,
  onCardClick,
  onAnswerClick,
  isLoading = false,
}) => {
  const theme = useTheme();

  // const { handleTitleClick, handleAnswerClick, handleDeleteClick } =
  //   useQuestionCard({
  //     questionId: question.id,
  //     userId: user.id,
  //     onCardClick,
  //     onAnswerClick,
  //   });

  console.log(questionData);

  // Define theme colors for easy reference
  const themeColors = {
    cardBg: theme.palette.background.paper,
    border: theme.palette.mode === "light" ? "#e0e0e0" : "#333333",
  };

  // Korean content
  const koreanContent = {
    popularPosts: "내가 작성한 질문",
  };

  return (
    <>
      {" "}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {koreanContent.popularPosts}
        </Typography>
      </Box>{" "}
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
          height: "56vh",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {isLoading ? (
            // 스켈레톤 로딩 표시
            Array.from({ length: 3 }).map((_, index) => (
              <QuestionCardSkeleton key={index} />
            ))
          ) : questionData.length > 0 ? (
            // 실제 데이터 표시
            questionData.map((question) => (
              <CommonCard
                key={question.id}
                question={question}
                user={userData}
                onCardClick={onCardClick}
                onAnswerClick={onAnswerClick}
                showActions={true}
                questionUserId={question.userId}
              />
            ))
          ) : (
            // 데이터가 없을 때 표시
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
    </>
  );
};

export default MyQuestion;
