import {
  Box,
  Card,
  CardContent,
  Typography,
  // useTheme,
  Skeleton,
} from "@mui/material";
import {
  CardHeaderSection,
  CardContentSection,
  CardActionsSection,
  ThumbnailSection,
} from "./card/index";
import { getExcerpt } from "./card/utils/questionUtils";
import { useQuestionCard } from "./card/hooks/useQuestionCard";

interface Question {
  id: number | string;
  title: string;
  content: string;
  likes?: number;
  thumbnail?: string;
  createdAt?: string | Date;
}

interface User {
  id: number | string;
  name: string;
}

interface QuestionCardProps {
  question: Question;
  user: User;
  onCardClick?: (questionId: number | string) => void;
  onAnswerClick?: (questionId: number | string) => void;
  onLikeClick?: (questionId: number | string) => void;
  onBookmarkClick?: (questionId: number | string) => void;
  showActions?: boolean;
  questionUserId: string;
  isLoading?: boolean;
}

// 스켈레톤 카드 컴포넌트
const QuestionCardSkeleton = () => {
  // const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        // backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "#333333",
        // border: theme.palette.mode === "light" ? "1px solid #F0F0F0" : "none",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header Skeleton */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Skeleton
            variant="circular"
            width={32}
            height={32}
            sx={{ mr: 1.5 }}
          />
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
            <Skeleton
              variant="text"
              width="100%"
              height={20}
              sx={{ mb: 0.5 }}
            />
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
      </CardContent>
    </Card>
  );
};

const QuestionCard = ({
  question,
  user,
  onCardClick,
  onAnswerClick,
  showActions = true,
  questionUserId,
  isLoading = false,
}: QuestionCardProps) => {
  // const theme = useTheme();

  const { handleTitleClick, handleAnswerClick, handleDeleteClick } =
    useQuestionCard({
      questionId: question.id,
      userId: user.id,
      onCardClick,
      onAnswerClick,
    });

  const userId = user.id;

  if (isLoading) {
    return <QuestionCardSkeleton />;
  }

  return (
    <Card
      sx={{
        borderRadius: 2,

        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        transition: "all 0.3s",
        "&:hover": {
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          transform: "translateY(-2px)",
          // backgroundColor:
          //   theme.palette.mode === "light" ? "#F5F5F5" : "#4F4F4F",
        },
        // backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "#333333",
        // border: theme.palette.mode === "light" ? "1px solid #F0F0F0" : "none",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <CardHeaderSection user={user} question={question} />

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
          {/* Content */}
          <Box sx={{ flex: 1 }}>
            <CardContentSection
              question={question}
              handleTitleClick={handleTitleClick}
            />

            <Typography
              variant="body2"
              sx={{
                // color: theme.palette.text.secondary,
                mb: showActions ? 2.5 : 0,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: 1.5,
                whiteSpace: "pre-wrap",
              }}
            >
              {getExcerpt(question.content, 100)}
            </Typography>

            {/* Actions */}
            {showActions && (
              <CardActionsSection
                onCardClick={onCardClick}
                handleAnswerClick={handleAnswerClick}
                handleDeleteClick={handleDeleteClick}
                question={question}
                questionUserId={questionUserId}
                userId={userId}
              />
            )}
          </Box>

          {/* Thumbnail */}
          <ThumbnailSection
            thumbnail={question.thumbnail}
            content={question.content}
            title={question.title}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
