import { Box, Card, CardContent } from "@mui/material";

import {
  TagsSection,
  UserInfoSection,
  ThumbnailSection,
  TitleAndExcerpt,
  SkeletonItem,
  EmptyQuestionsState,
} from "./list/index";

interface User {
  id: number | string;
  name: string;
}

interface Question {
  id: number | string;
  title: string;
  content: string;
  likes?: number;
  thumbnail?: string;
  createdAt: string | Date;
  user: User;
  userId?: string | undefined;
  tags?: string[];
}

interface QuestionListProps {
  questions: Question[];
  loading: boolean;
  currentPage: number;
  searchQuery: string;
}

const extractImageFromContent = (htmlContent: string): string | null => {
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
  const match = htmlContent.match(imgRegex);
  return match ? match[1] : null;
};

const QuestionList = ({ questions, loading }: QuestionListProps) => {
  if (loading) {
    return (
      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <SkeletonItem withThumbnail={true} />
        <SkeletonItem withThumbnail={true} />
        <SkeletonItem withThumbnail={true} />
      </Box>
    );
  }

  if (questions.length === 0) {
    return <EmptyQuestionsState />;
  }

  return (
    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      {questions.map((question) => {
        const thumbnailSrc =
          question.thumbnail || extractImageFromContent(question.content);

        return (
          <Card
            key={question.id}
            variant="outlined"
            sx={{
              borderRadius: 2,
              transition: "all 0.3s",
              "&:hover": {
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                transform: "translateY(-2px)",
                bgcolor: "action.hover",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <UserInfoSection
                createdAt={question.createdAt}
                userId={question.userId}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 3,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <TitleAndExcerpt
                    questionId={question.id}
                    questionTitle={question.title}
                    questionContent={question.content}
                  />

                  {question.tags && question.tags.length > 0 && (
                    <TagsSection tags={question.tags} />
                  )}
                </Box>

                {thumbnailSrc && (
                  <ThumbnailSection thumbnailSrc={thumbnailSrc} />
                )}
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default QuestionList;
