import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Avatar,
  Button,
  IconButton,
  useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { realUserInfo } from "@atom/auth";
import useFetchMyInfo from "@components/my-info/hooks/useFetchMyInfo";

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

const formatDate = (dateInput: string | Date) => {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  return date.toLocaleDateString("ko-KR");
};

const extractImageFromContent = (htmlContent: string): string | null => {
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
  const match = htmlContent.match(imgRegex);
  return match ? match[1] : null;
};

const QuestionList = ({
  questions,
  loading,
  currentPage,
  searchQuery,
  fetchAllQuestions,
}: QuestionListProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [user] = useAtom(realUserInfo);
  const { data: myInfo } = useFetchMyInfo(user?.id);

  const handleCardClick = (questionId: number | string) => {
    navigate(`/question/${questionId}`);
  };

  const handleTitleClick = (questionId: number | string) => {
    navigate(`/questions/${questionId}`);
  };

  const handleDeleteClick = async (questionId: number | string) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        console.log("삭제:", questionId);
        // Assuming there's an API call to delete the question
        // await fetch(`http://localhost:3000/questions/${questionId}`, { method: 'DELETE' });
        fetchAllQuestions(currentPage, 5, searchQuery);
      } catch (error) {
        console.error("삭제 실패:", error);
      }
    }
  };

  return (
    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      {loading ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="body2" color="text.secondary">
            로딩 중...
          </Typography>
        </Box>
      ) : questions.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="body2" color="text.secondary">
            등록된 질문이 없습니다.
          </Typography>
        </Box>
      ) : (
        <>
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
                    theme.palette.mode === "light"
                      ? "1px solid #F0F0F0"
                      : "none",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Avatar
                      src={myInfo?.profileImageUrl}
                      sx={{
                        width: 28,
                        height: 28,
                        mr: 1,
                        bgcolor: "#b8dae1",
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 16 }} />
                    </Avatar>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: theme.palette.text.primary,
                      }}
                    >
                      {myInfo?.nickname}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mx: 1, color: "#BDBDBD" }}
                    >
                      •
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.primary }}
                    >
                      {formatDate(question.createdAt)}
                    </Typography>
                  </Box>

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
                        <Stack
                          direction="row"
                          spacing={1}
                          mb={2}
                          flexWrap="wrap"
                        >
                          {question.tags.map((tag: string) => (
                            <Chip key={tag} label={tag} size="small" />
                          ))}
                        </Stack>
                      )}

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
                          startIcon={
                            <CommentOutlinedIcon sx={{ fontSize: 18 }} />
                          }
                          onClick={() => handleCardClick(question.id)}
                        >
                          확인하기
                        </Button>

                        <Box sx={{ flexGrow: 1 }} />
                        {isOwner && (
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton
                              size="small"
                              aria-label="삭제"
                              sx={{ color: "#757575" }}
                              onClick={() => handleDeleteClick(question.id)}
                            >
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              aria-label="수정"
                              sx={{ color: "#757575" }}
                              onClick={() => {
                                navigate(`/modify/${question.id}`);
                              }}
                            >
                              <EditOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        )}
                      </Box>
                    </Box>

                    {thumbnailSrc && (
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
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </Box>
                      </Box>
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
