import {
  Box,
  Card,
  CardContent,
  useTheme,
  Skeleton,
  Typography,
} from "@mui/material";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
// import { useAtom } from "jotai";

// import { realUserInfo } from "@atom/auth";
// import useFetchMyInfo from "@components/my-info/hooks/useFetchMyInfo";

import {
  TagsSection,
  UserInfoSection,
  ThumbnailSection,
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

const SkeletonItem = ({
  withThumbnail = false,
}: {
  withThumbnail?: boolean;
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Skeleton variant="circular" width={28} height={28} sx={{ mr: 1 }} />
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
            <Skeleton variant="text" width="70%" height={28} sx={{ mb: 1 }} />

            <Skeleton variant="text" width="90%" height={20} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="60%" height={20} sx={{ mb: 2 }} />

            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <Skeleton variant="rounded" width={60} height={24} />
              <Skeleton variant="rounded" width={80} height={24} />
              <Skeleton variant="rounded" width={50} height={24} />
            </Box>

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
  // const [user] = useAtom(realUserInfo);
  // const { isLoading: isMyInfoLoading } = useFetchMyInfo(user?.id);

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
    return (
      <Box
        sx={{
          textAlign: "center",
          minHeight: "60vh",
          p: { xs: 3, sm: 8 },
          mt: 4,
          border: `1px dashed ${theme.palette.divider}`,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "action.hover",
        }}
      >
        <LiveHelpOutlinedIcon
          sx={{
            fontSize: 64,
            mb: 2,
            color: "text.disabled",
          }}
        />
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          아직 검색어와 관련된 질문이 없어요
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          가장 먼저 질문을 등록하고 지식을 나눠보세요!
        </Typography>
      </Box>
    );
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
