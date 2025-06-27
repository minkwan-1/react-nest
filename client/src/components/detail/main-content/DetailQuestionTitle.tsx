import { Box, Typography, Stack, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { questionsAtom } from "@atom/question";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const themeColors = {
  primary: "#3B82F6",
  primaryLight: "#EFF6FF",
  primaryDark: "#1E40AF",
  background: "#FFFFFF",
  surface: "#F8FAFC",
  borderLight: "#E2E8F0",
  textPrimary: "#1E293B",
  textSecondary: "#64748B",
  upvote: "#22C55E",
  downvote: "#EF4444",
  tag: {
    bg: "#E0F2FE",
    text: "#0369A1",
  },
  accepted: "#059669",
  code: {
    bg: "#F8F9FC",
    border: "#E5E7EB",
    text: "#374151",
  },
  ai: {
    bg: "#F0F9FF",
    border: "#BAE6FD",
    accent: "#0EA5E9",
  },
};

type Question = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  user: {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
    createdAt: string;
  };
  userId: string;
};

const DetailQuestionTitle = () => {
  const { id } = useParams();
  const [questions] = useAtom(questionsAtom);
  const theme = useTheme();

  // URL의 id와 일치하는 질문 찾기
  const question = questions?.find(
    (q: Question) => q.id === parseInt(id || "0")
  );

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("ko-KR", options);
  };

  // 질문이 없으면 빈 컴포넌트 반환
  if (!question) {
    return null;
  }

  return (
    <Box
      sx={{
        padding: "0 0 24px",
        borderBottom: `1px solid ${themeColors.borderLight}`,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 700,
          color: themeColors.textPrimary,
          mb: 2,
          fontSize: { xs: "1.5rem", md: "2rem" },
          ...theme.applyStyles("dark", {
            color: "#f0f0f0",
          }),
        }}
      >
        {question.title}
      </Typography>

      <Stack
        direction="row"
        spacing={3}
        sx={{
          color: themeColors.textSecondary,
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <AccessTimeIcon fontSize="small" />
          <Typography variant="body2">
            {formatDate(question.createdAt)}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default DetailQuestionTitle;
