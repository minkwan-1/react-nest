import { Box, Card, CardContent, useTheme } from "@mui/material";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";

import {
  TagsSection,
  EmptyStateSection,
  UserInfoSection,
  ThumbnailSection,
  OwnerActionButtons,
  ViewDetailsButton,
  TitleAndExcerpt,
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
  const theme = useTheme();

  const [user] = useAtom(realUserInfo);

  return (
    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      {loading ? (
        <EmptyStateSection type="loading" message="로딩 중..." />
      ) : questions.length === 0 ? (
        <EmptyStateSection type="empty" message="등록된 질문이 없습니다." />
      ) : (
        <>
          {questions.map((question) => {
            const isOwner = user?.id === question.user?.id;
            const thumbnailSrc =
              question.thumbnail || extractImageFromContent(question.content);

            return (
              // QuestionCard
              <Card
                key={question.id}
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
                  backgroundColor:
                    theme.palette.mode === "light" ? "#ffffff" : "#333333",
                  border:
                    theme.palette.mode === "light"
                      ? "1px solid #F0F0F0"
                      : "none",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <UserInfoSection createdAt={question.createdAt} />

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

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ViewDetailsButton questionId={question.id} />

                        <Box sx={{ flexGrow: 1 }} />
                        {isOwner && (
                          <OwnerActionButtons questionId={question.id} />
                        )}
                      </Box>
                    </Box>

                    {thumbnailSrc && (
                      <ThumbnailSection thumbnailSrc={thumbnailSrc} />
                    )}
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </>
      )}
    </Box>
  );
};

export default QuestionList;
