import { Box, Typography, Avatar, IconButton, Tooltip } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { allQuestionsAtom } from "@atom/question";
import { HomePageTitle, SearchBar } from "@components/home/index";

// 타입 정의
interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt?: string;
}

interface Question {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  tags: string[];
  userId: string;
  user: User;
}

// HTML에서 첫 번째 이미지 src 추출
const extractFirstImage = (html: string): string | null => {
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
};

// HTML에서 텍스트만 추출
const extractText = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

// 날짜 포맷팅: "2025. 7. 3."
const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
};

const MainContent = () => {
  const [allQuestions, setAllQuestions] = useAtom(allQuestionsAtom);

  const fetchAllQuestions = async () => {
    try {
      const response = await fetch("http://localhost:3000/questions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setAllQuestions(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  return (
    <Box
      sx={{
        flex: 2,
        pr: { xs: "0", sm: "0", md: "3" },
        overflowY: "auto",
        height: "100%",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": { width: "6px" },
        "&::-webkit-scrollbar-track": { backgroundColor: "#F1F1F1" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#BDBDBD",
          borderRadius: "10px",
        },
      }}
    >
      <HomePageTitle />
      <SearchBar />

      <Box sx={{ mt: 2 }}>
        {allQuestions.map((question: Question) => {
          const imageSrc = extractFirstImage(question.content);
          const plainText = extractText(question.content);
          const dateText = formatDate(question.createdAt);

          return (
            <Box
              key={question.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                p: 2,
                mb: 2,
                backgroundColor: "#fff",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              }}
            >
              {/* 왼쪽: 텍스트 정보 */}
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar sx={{ width: 30, height: 30, fontSize: 14, mr: 1 }}>
                    {question.user.name[0]}
                  </Avatar>
                  <Typography variant="body2" color="text.secondary">
                    {question.user.name} ・ {dateText}
                  </Typography>
                </Box>

                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {question.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {plainText}
                </Typography>

                <Box
                  sx={{
                    mt: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: "#1976d2" }}
                  >
                    확인하기
                  </Typography>
                </Box>
              </Box>

              {/* 오른쪽: 썸네일 + 아이콘들 */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  minWidth: 100,
                }}
              >
                {imageSrc && (
                  <Box
                    component="img"
                    src={imageSrc}
                    alt="thumbnail"
                    sx={{ width: 120, height: "auto", borderRadius: 2, mb: 1 }}
                  />
                )}
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Tooltip title="삭제">
                    <IconButton>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="수정">
                    <IconButton>
                      <EditOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default MainContent;
