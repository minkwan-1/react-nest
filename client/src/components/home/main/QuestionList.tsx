import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  useTheme,
} from "@mui/material";

import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { realUserInfo } from "@atom/auth";

import {
  TagsSection,
  EmptyStateSection,
  UserInfoSection,
  ThumbnailSection,
  OwnerActionButtons,
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
  fetchAllQuestions: (
    page?: number,
    limit?: number,
    search?: string
  ) => Promise<void>;
}

const stripHtml = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const getExcerpt = (content: string, maxLength: number = 100): string => {
  const plainText = stripHtml(content);
  return plainText.length > maxLength
    ? plainText.substring(0, maxLength) + "..."
    : plainText;
};

const extractImageFromContent = (htmlContent: string): string | null => {
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
  const match = htmlContent.match(imgRegex);
  return match ? match[1] : null;
};

const QuestionList = ({ questions, loading }: QuestionListProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [user] = useAtom(realUserInfo);

  const handleCardClick = (questionId: number | string) => {
    navigate(`/question/${questionId}`);
  };

  const handleTitleClick = (questionId: number | string) => {
    navigate(`/questions/${questionId}`);
  };

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
                    {/* QuestionContentSection */}
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          mb: 1.5,
                          fontSize: "18px",
                          lineHeight: 1.4,
                          cursor: "pointer",
                          "&:hover": { textDecoration: "underline" },
                        }}
                        onClick={() => handleTitleClick(question.id)}
                      >
                        {question.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          mb: 2.5,
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

                      {question.tags && question.tags.length > 0 && (
                        <TagsSection tags={question.tags} />
                      )}

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {/* ViewDetailsButton */}
                        <Button
                          size="small"
                          sx={{
                            color: "#b8dae1",
                            fontWeight: 500,
                            textTransform: "none",
                            "&:hover": {
                              color: "#02a770",
                              backgroundColor: "rgba(3, 203, 132, 0.05)",
                            },
                            pl: 0,
                            borderRadius: 6,
                          }}
                          startIcon={
                            <CommentOutlinedIcon sx={{ fontSize: 18 }} />
                          }
                          onClick={() => handleCardClick(question.id)}
                        >
                          확인하기
                        </Button>

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
