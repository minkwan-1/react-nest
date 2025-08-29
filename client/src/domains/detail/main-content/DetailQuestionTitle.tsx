import { Box, Typography, Stack, Chip } from "@mui/material";
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
  tag: {
    bg: "#E0F2FE",
    text: "#0369A1",
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

  const question = questions?.find(
    (q: Question) => q.id === parseInt(id || "0")
  );

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

  if (!question) return null;

  return (
    <Box
      sx={{
        padding: "0 0 24px",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 700,

          mb: 2,
          fontSize: { xs: "1.5rem", md: "2rem" },
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

      <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
        {question.tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            size="small"
            sx={{
              fontWeight: 500,
              fontSize: "0.75rem",
              borderRadius: "4px",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default DetailQuestionTitle;
