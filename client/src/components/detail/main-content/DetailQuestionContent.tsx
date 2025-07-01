import { Box, Paper, alpha, Avatar, Typography, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { questionsAtom } from "@atom/question";

const generateAvatarText = (name: string) => name.charAt(0).toUpperCase();

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

const DetailQuestionContent = () => {
  const { id } = useParams();
  const [questions] = useAtom(questionsAtom);
  const theme = useTheme();
  const mode = theme.palette.mode;

  const isDark = mode === "dark";

  const colors = {
    primary: "#3B82F6",
    primaryDark: "#1E40AF",
    textPrimary: isDark ? "#F8FAFC" : "#1E293B",
    textSecondary: isDark ? "#CBD5E1" : "#64748B",
    background: isDark ? "#1E293B" : "#FFFFFF",
    surface: isDark ? "#334155" : "#F8FAFC",
    borderLight: isDark ? "#475569" : "#E2E8F0",
    tagBg: isDark ? alpha("#E0F2FE", 0.15) : "#E0F2FE",
    tagText: "#0369A1",
    codeBg: isDark ? alpha("#1E293B", 0.8) : "#F8F9FC",
    codeBorder: isDark ? "#334155" : "#E5E7EB",
    codeText: isDark ? "#E2E8F0" : "#374151",
    imgBorder: isDark ? "#475569" : "#E2E8F0",
  };

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
          bgcolor: colors.background,
          border: `1px solid ${colors.borderLight}`,
          "& p": {
            mb: 2,
            color: colors.textPrimary,
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
            color: colors.primaryDark,
            fontWeight: 600,
          },
          "& code": {
            fontFamily: "monospace",
            backgroundColor: colors.codeBg,
            padding: "2px 4px",
            borderRadius: "4px",
            fontSize: "0.9em",
            color: colors.codeText,
            border: `1px solid ${colors.codeBorder}`,
          },
          "& img": {
            maxWidth: "100%",
            height: "auto",
            borderRadius: "8px",
            marginTop: "8px",
            marginBottom: "8px",
            border: `1px solid ${colors.imgBorder}`,
          },
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: question.content }} />
      </Paper>

      {/* 작성자 정보 */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            backgroundColor: colors.surface,
            borderRadius: 2,
            border: `1px solid ${colors.borderLight}`,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              border: `1px solid ${colors.borderLight}`,
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
              sx={{ fontWeight: 600, color: colors.textPrimary }}
            >
              {question.user.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: colors.textSecondary, display: "block" }}
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
