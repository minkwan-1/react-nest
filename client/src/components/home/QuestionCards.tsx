import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  IconButton,
  useTheme,
  Badge,
  Skeleton,
} from "@mui/material";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useEffect, useState } from "react";

interface Question {
  id: number;
  author: string;
  date: string;
  title: string;
  content: string;
  likes: number;
  thumbnail: string;
}

interface QuestionCardsProps {
  question: Question;
}

const QuestionCards = ({ question }: QuestionCardsProps) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5초 후에 로딩 해제

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 해제
  }, []);

  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        transition: "all 0.3s",
        "&:hover": {
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          transform: "translateY(-2px)",
          backgroundColor:
            theme.palette.mode === "light" ? "#F5F5F5" : "#4F4F4F",
        },
        backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "#333333",
        border: theme.palette.mode === "light" ? "1px solid #F0F0F0" : "none",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* 프로필 섹션 */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          {loading ? (
            <Skeleton variant="circular" width={28} height={28} />
          ) : (
            <Avatar
              sx={{
                width: 28,
                height: 28,
                mr: 1,
                bgcolor: "#c5a3d5",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {question.author.charAt(0)}
            </Avatar>
          )}
          {loading ? (
            <Skeleton width={100} height={16} />
          ) : (
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, color: theme.palette.text.primary }}
            >
              {question.author}
            </Typography>
          )}
          {!loading && (
            <>
              <Typography variant="body2" sx={{ mx: 1, color: "#BDBDBD" }}>
                •
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.primary }}
              >
                {question.date}
              </Typography>
            </>
          )}
        </Box>

        {/* 질문 제목 & 내용 */}
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            {loading ? (
              <>
                <Skeleton width="80%" height={24} />
                <Skeleton width="90%" height={18} sx={{ mt: 1 }} />
              </>
            ) : (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 1.5,
                    fontSize: "18px",
                    lineHeight: 1.4,
                    color: theme.palette.text.primary,
                  }}
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
                  }}
                >
                  {question.content}
                </Typography>
              </>
            )}

            {/* 답변, 좋아요, 북마크 */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {loading ? (
                <Skeleton width={80} height={32} />
              ) : (
                <Button
                  size="small"
                  sx={{
                    color: "#c5a3d5",
                    fontWeight: 500,
                    textTransform: "none",
                    "&:hover": {
                      color: "#02a770",
                      backgroundColor: "rgba(3, 203, 132, 0.05)",
                    },
                    pl: 0,
                    borderRadius: 6,
                  }}
                  startIcon={<CommentOutlinedIcon sx={{ fontSize: 18 }} />}
                >
                  답변하기
                </Button>
              )}
              <Badge sx={{ mx: 1 }}>
                <Box sx={{ width: 16 }} />
              </Badge>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  size="small"
                  aria-label="좋아요"
                  sx={{ color: "#757575" }}
                >
                  {loading ? (
                    <Skeleton variant="circular" width={24} height={24} />
                  ) : (
                    <ThumbUpOutlinedIcon fontSize="small" />
                  )}
                </IconButton>
                {loading ? (
                  <Skeleton width={24} height={16} />
                ) : (
                  <Typography variant="body2" sx={{ color: "#757575", mr: 2 }}>
                    {question.likes}
                  </Typography>
                )}
                <IconButton
                  size="small"
                  aria-label="저장"
                  sx={{ color: "#757575" }}
                >
                  {loading ? (
                    <Skeleton variant="circular" width={24} height={24} />
                  ) : (
                    <BookmarkBorderIcon fontSize="small" />
                  )}
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* 썸네일 */}
          <Box sx={{ flexShrink: 0, display: { xs: "none", sm: "block" } }}>
            <Box
              sx={{
                width: "140px",
                height: "100px",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
              }}
            >
              {loading ? (
                <Skeleton variant="rectangular" width={140} height={100} />
              ) : (
                <img
                  src={question.thumbnail}
                  alt={question.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuestionCards;
