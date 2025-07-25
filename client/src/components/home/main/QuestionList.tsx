import { Box, Card, CardContent, useTheme, Skeleton } from "@mui/material";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";

import {
  TagsSection,
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

const SkeletonItem = ({
  withThumbnail = false,
}: {
  withThumbnail?: boolean;
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "#333333",
        border: theme.palette.mode === "light" ? "1px solid #F0F0F0" : "none",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* UserInfoSection 스켈레톤 */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} />
          <Skeleton variant="text" width={80} height={20} />
          <Box sx={{ flexGrow: 1 }} />
          <Skeleton variant="text" width={60} height={20} />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Box sx={{ flex: 1 }}>
            {/* 제목 스켈레톤 */}
            <Skeleton variant="text" width="70%" height={28} sx={{ mb: 1 }} />

            {/* 내용 스켈레톤 */}
            <Skeleton variant="text" width="90%" height={20} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="60%" height={20} sx={{ mb: 2 }} />

            {/* 태그 스켈레톤 */}
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <Skeleton variant="rounded" width={60} height={24} />
              <Skeleton variant="rounded" width={80} height={24} />
              <Skeleton variant="rounded" width={50} height={24} />
            </Box>

            {/* 하단 버튼 영역 스켈레톤 */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Skeleton variant="rounded" width={80} height={32} />
              <Box sx={{ flexGrow: 1 }} />
              <Skeleton
                variant="rounded"
                width={60}
                height={32}
                sx={{ mr: 1 }}
              />
              <Skeleton variant="rounded" width={60} height={32} />
            </Box>
          </Box>

          {/* 썸네일 스켈레톤 (조건부) */}
          {withThumbnail && (
            <Box sx={{ flexShrink: 0 }}>
              <Skeleton
                variant="rounded"
                width={120}
                height={90}
                sx={{ borderRadius: 1 }}
              />
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

const QuestionList = ({ questions, loading }: QuestionListProps) => {
  const theme = useTheme();
  const [user] = useAtom(realUserInfo);

  if (loading) {
    return (
      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <SkeletonItem withThumbnail={true} />
        <SkeletonItem withThumbnail={false} />
        <SkeletonItem withThumbnail={true} />
      </Box>
    );
  }

  if (questions.length === 0) {
    return (
      <Box
        sx={{
          mt: 4,
          textAlign: "center",
          color: theme.palette.text.secondary,
          fontSize: "1rem",
        }}
      >
        등록된 질문이 없습니다.
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      {questions.map((question) => {
        const isOwner = user?.id === question.user?.id;
        const thumbnailSrc =
          question.thumbnail || extractImageFromContent(question.content);

        return (
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
                theme.palette.mode === "light" ? "1px solid #F0F0F0" : "none",
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
                    {isOwner && <OwnerActionButtons questionId={question.id} />}
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
    </Box>
  );
};

export default QuestionList;
