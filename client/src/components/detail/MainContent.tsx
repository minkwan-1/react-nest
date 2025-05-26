import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Chip,
  Avatar,
  Paper,
  Stack,
  alpha,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useAtom } from "jotai";
import { questionsAtom } from "@atom/question";

// 테마 색상
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
};

type Question = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  user: {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
    createdAt: string;
  };
  userId: string;
};

const MainContent = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [questions] = useAtom(questionsAtom);
  const [loading, setLoading] = useState(true);

  console.log("상세 페이지의 메인 컨텐츠에서 보여줄 데이터: ", questions);

  useEffect(() => {
    if (!id || !questions || questions.length === 0) {
      setLoading(false);
      return;
    }

    // URL의 id와 일치하는 질문 찾기
    const foundQuestion = questions.find((q) => q.id === parseInt(id));

    // API 호출 시뮬레이션 (실제로는 이미 데이터가 있으므로 짧은 딜레이만)
    const timer = setTimeout(() => {
      setQuestion(foundQuestion || null);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id, questions]);

  // 코드 하이라이팅 및 이미지 스타일링 적용
  useEffect(() => {
    if (!loading && question) {
      // 코드 하이라이팅 적용
      document.querySelectorAll("pre code").forEach((block) => {
        if (block && block.parentElement) {
          block.parentElement.style.background = themeColors.code.bg;
          block.parentElement.style.border = `1px solid ${themeColors.code.border}`;
          block.parentElement.style.borderRadius = "6px";
          block.parentElement.style.padding = "16px";
          block.parentElement.style.overflow = "auto";
          block.parentElement.style.fontSize = "14px";
          block.parentElement.style.fontFamily = "monospace";
          block.parentElement.style.lineHeight = "1.5";
          block.parentElement.style.marginBottom = "16px";
          block.parentElement.style.marginTop = "10px";
        }
      });

      // 이미지 스타일링 적용
      document.querySelectorAll("img").forEach((img) => {
        img.style.maxWidth = "100%";
        img.style.height = "auto";
        img.style.borderRadius = "8px";
        img.style.marginTop = "8px";
        img.style.marginBottom = "8px";
        img.style.border = `1px solid ${themeColors.borderLight}`;
      });
    }
  }, [loading, question]);

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

  // 사용자 아바타 생성 함수 (이름 첫 글자 사용)
  const generateAvatarText = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <Box
      sx={{
        flex: 1.5,
        pr: { xs: "0", sm: "0", md: "3" },
        overflowY: "auto",
        height: "100%",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#F1F1F1",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#BDBDBD",
          borderRadius: "10px",
        },
      }}
    >
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress sx={{ color: themeColors.primary }} />
        </Box>
      ) : !question ? (
        <Box sx={{ py: 4, textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{ color: themeColors.textSecondary, mb: 2 }}
          >
            질문을 찾을 수 없습니다
          </Typography>
          <Typography variant="body1" sx={{ color: themeColors.textSecondary }}>
            요청하신 질문이 존재하지 않거나 삭제되었을 수 있습니다.
          </Typography>
        </Box>
      ) : (
        <>
          {/* 질문 헤더 */}
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
                  {formatDate(question.user.createdAt)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <VisibilityIcon fontSize="small" />
                <Typography variant="body2">
                  조회 {Math.floor(Math.random() * 500) + 50}회
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* 질문 내용 */}
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
        </>
      )}
    </Box>
  );
};

export default MainContent;
