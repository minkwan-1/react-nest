import React from "react";
import { Box, Typography, Paper, Skeleton } from "@mui/material";
import CommonCard from "@domains/common/Card";

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

const QuestionCardSkeleton = () => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        p: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Skeleton variant="circular" width={32} height={32} sx={{ mr: 1.5 }} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="30%" height={20} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="20%" height={16} />
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="80%" height={28} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="100%" height={20} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="70%" height={20} sx={{ mb: 2.5 }} />
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
  const koreanContent = {
    popularPosts: "내가 작성한 질문",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "620px",
      }}
    >
      <Box sx={{ width: "100%", mb: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          {koreanContent.popularPosts}
        </Typography>
      </Box>
      <Paper
        elevation={0}
        sx={{
          p: 1,
          borderRadius: 2,
          width: "100%",
          overflowY: "auto",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            flex: 1,
          }}
        >
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <QuestionCardSkeleton key={index} />
            ))
          ) : questionData.length > 0 ? (
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
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
    </Box>
  );
};

export default MyQuestion;
