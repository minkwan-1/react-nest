import { Box, Paper, alpha, Avatar, Typography, Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { questionsAtom } from "@atom/question";

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

const generateAvatarText = (name: string) => {
  return name.charAt(0).toUpperCase();
};

const DetailQuestionContent = () => {
  const { id } = useParams();
  const [questions] = useAtom(questionsAtom);

  // URL의 id와 일치하는 질문 찾기
  const question = questions?.find(
    (q: Question) => q.id === parseInt(id || "0")
  );

  if (!question) {
    return <Typography>질문을 찾을 수 없습니다.</Typography>;
  }
  return (
    <Box sx={{ mt: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: themeColors.background,
          border: `1px solid ${themeColors.borderLight}`,
          "& p": {
            mb: 2,
            color: themeColors.textPrimary,
            lineHeight: 1.7,
          },
          "& ul, & ol": {
            pl: 3,
            mb: 2,
            "& li": {
              mb: 1,
            },
          },
          "& strong": {
            color: themeColors.primaryDark,
            fontWeight: 600,
          },
          "& code": {
            fontFamily: "monospace",
            backgroundColor: alpha(themeColors.code.bg, 0.7),
            padding: "2px 4px",
            borderRadius: "4px",
            fontSize: "0.9em",
          },
          "& img": {
            maxWidth: "100%",
            height: "auto",
            borderRadius: "8px",
            marginTop: "8px",
            marginBottom: "8px",
            border: `1px solid ${themeColors.borderLight}`,
          },
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: question.content }} />

        {/* 태그 */}
        <Box sx={{ mt: 4, display: "flex", flexWrap: "wrap", gap: 1 }}>
          {question.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              sx={{
                backgroundColor: themeColors.tag.bg,
                color: themeColors.tag.text,
                fontWeight: 500,
                fontSize: "0.75rem",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: alpha(themeColors.tag.bg, 0.7),
                },
              }}
            />
          ))}
        </Box>
      </Paper>

      {/* 작성자 정보 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 2,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 2,
            backgroundColor: themeColors.surface,
            borderRadius: 2,
            border: `1px solid ${themeColors.borderLight}`,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              border: "1px solid #adb5be",
              backgroundColor: "#b8dae1",
              color: "white",
              fontWeight: 600,
            }}
          >
            {generateAvatarText(question.user.name)}
          </Avatar>
          <Box>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: themeColors.textPrimary,
              }}
            >
              {question.user.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: themeColors.textSecondary,
                display: "block",
              }}
            >
              작성자
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default DetailQuestionContent;
