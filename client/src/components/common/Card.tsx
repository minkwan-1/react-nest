import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Button,
  useTheme,
} from "@mui/material";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

interface Question {
  id: number | string;
  title: string;
  content: string;
  likes?: number;
  thumbnail?: string;
  createdAt?: string | Date;
}

interface User {
  id: number | string;
  name: string;
}

interface QuestionCardProps {
  question: Question;
  user: User;
  onCardClick?: (questionId: number | string) => void;
  onAnswerClick?: (questionId: number | string) => void;
  onLikeClick?: (questionId: number | string) => void;
  onBookmarkClick?: (questionId: number | string) => void;
  showActions?: boolean;
}

const QuestionCard = ({
  question,
  user,
  onCardClick,
  onAnswerClick,
  onLikeClick,
  onBookmarkClick,
  showActions = true,
}: QuestionCardProps) => {
  const navigate = useNavigate();
  const theme = useTheme();

  // 간단한 HTML 태그 제거 함수
  const stripHtml = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // 글자수 제한된 내용 일부 반환
  const getExcerpt = (htmlContent: string, maxLength = 100) => {
    const text = stripHtml(htmlContent);
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // HTML 컨텐츠에서 첫 번째 이미지 URL 추출
  const extractImageFromContent = (htmlContent: string): string | null => {
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
    const match = htmlContent.match(imgRegex);
    return match ? match[1] : null;
  };

  const handleTitleClick = () => {
    if (onCardClick) {
      onCardClick(question.id);
    } else {
      console.log("실패");
      // navigate(`/questions/${question.id}`);
    }
  };

  const handleAnswerClick = () => {
    if (onAnswerClick) {
      onAnswerClick(question.id);
    } else {
      navigate(`/questions/${question.id}`);
    }
  };

  const handleLikeClick = () => {
    if (onLikeClick) {
      onLikeClick(question.id);
    }
  };

  const handleBookmarkClick = () => {
    if (onBookmarkClick) {
      onBookmarkClick(question.id);
    }
  };

  const handleDeleteClick = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/questions/${question.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id }), // 권한 확인용
        }
      );

      if (!res.ok) {
        throw new Error(`삭제 실패: ${res.status}`);
      }

      // 204 No Content이므로 json() 호출 ❌
      alert("질문이 삭제되었습니다.");
      // 페이지 새로고침 또는 목록 갱신
      // window.location.reload();
    } catch (error) {
      console.error("삭제 에러:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <Card
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
        backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "#333333",
        border: theme.palette.mode === "light" ? "1px solid #F0F0F0" : "none",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* 프로필 섹션 */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            sx={{
              width: 28,
              height: 28,
              mr: 1,
              bgcolor: "#b8dae1",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {user.name?.charAt(0) || "U"}
          </Avatar>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: theme.palette.text.primary,
            }}
          >
            {user.name}
          </Typography>
          <Typography variant="body2" sx={{ mx: 1, color: "#BDBDBD" }}>
            •
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.primary }}
          >
            {new Date(question.createdAt || Date.now()).toLocaleDateString(
              "ko-KR"
            )}
          </Typography>
        </Box>

        {/* 질문 제목 & 내용 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 1.5,
                fontSize: "18px",
                lineHeight: 1.4,
                color: "#1976d2",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={handleTitleClick}
            >
              {question.title}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                mb: showActions ? 2.5 : 0,
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

            {/* 답변, 좋아요, 북마크 */}
            {showActions && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
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
                  startIcon={<CommentOutlinedIcon sx={{ fontSize: 18 }} />}
                  onClick={handleAnswerClick}
                >
                  답변하기
                </Button>

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    size="small"
                    aria-label="저장"
                    sx={{ color: "#757575" }}
                    onClick={handleBookmarkClick}
                  >
                    <BookmarkBorderIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    aria-label="삭제"
                    sx={{ color: "#757575" }}
                    onClick={handleDeleteClick}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    aria-label="수정"
                    sx={{ color: "#757575" }}
                    onClick={() => {
                      navigate(`/questions/edit/${question.id}`);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    size="small"
                    aria-label="좋아요"
                    sx={{ color: "#757575" }}
                    onClick={handleLikeClick}
                  >
                    <ThumbUpOutlinedIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="body2" sx={{ color: "#757575", mr: 2 }}>
                    {question.likes || 0}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>

          {/* 썸네일 */}
          {(() => {
            const thumbnailSrc =
              question.thumbnail || extractImageFromContent(question.content);
            return (
              thumbnailSrc && (
                <Box
                  sx={{
                    flexShrink: 0,
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  <Box
                    sx={{
                      width: "140px",
                      height: "100px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    <img
                      src={thumbnailSrc}
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
                      onError={(e) => {
                        // 이미지 로드 실패 시 숨김
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </Box>
                </Box>
              )
            );
          })()}
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
