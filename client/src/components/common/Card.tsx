import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
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
}

const QuestionCard = ({
  question,
  user,
  onCardClick,
  onAnswerClick,
  showActions = true,
  questionUserId,
}: QuestionCardProps) => {
  const theme = useTheme();

  const { handleTitleClick, handleAnswerClick, handleDeleteClick } =
    useQuestionCard({
      questionId: question.id,
      userId: user.id,
      onCardClick,
      onAnswerClick,
    });

  const userId = user.id;

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        transition: "all 0.3s",
        "&:hover": {
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          transform: "translateY(-2px)",
          backgroundColor:
            theme.palette.mode === "light" ? "#F5F5F5" : "#4F4F4F",
        },
        backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "#333333",
        border: theme.palette.mode === "light" ? "1px solid #F0F0F0" : "none",
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
                color: theme.palette.text.secondary,
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
