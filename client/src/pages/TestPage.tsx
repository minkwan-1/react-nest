import { useEffect } from "react";
import axios from "axios";
import { PageContainer } from "@components/layout/common";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import QuestionCard from "@components/common/Card";

import { useAtom } from "jotai";
import { questionsAtom } from "@atom/question";
import { realUserInfo } from "@atom/auth";

const TestPage = () => {
  const [questions, setQuestions] = useAtom(questionsAtom);
  const [userInfo] = useAtom(realUserInfo);
  const theme = useTheme();

  useEffect(() => {
    if (!userInfo?.id) {
      setQuestions([]);
      return;
    }

    const fetchQuestionsByUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/questions/user/${userInfo.id}`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching user's questions:", error);
      }
    };

    fetchQuestionsByUser();
  }, [userInfo, setQuestions]);

  if (!userInfo?.id) {
    return (
      <PageContainer>
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h5"
            color="text.secondary"
            align="center"
            sx={{ mt: 4 }}
          >
            로그인 후 질문 목록을 확인할 수 있습니다.
          </Typography>
        </Box>
      </PageContainer>
    );
  }

  // 커스텀 이벤트 핸들러들
  const handleCardClick = (questionId: number | string) => {
    console.log("Card clicked:", questionId);
    // 필요시 커스텀 로직 추가
  };

  const handleAnswerClick = (questionId: number | string) => {
    console.log("Answer clicked:", questionId);
    // 필요시 커스텀 로직 추가
  };

  const handleLikeClick = (questionId: number | string) => {
    console.log("Like clicked:", questionId);
    // 좋아요 API 호출 등
  };

  const handleBookmarkClick = (questionId: number | string) => {
    console.log("Bookmark clicked:", questionId);
    // 북마크 API 호출 등
  };

  return (
    <PageContainer>
      <Box sx={{ p: 2, maxWidth: 800, margin: "0 auto" }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          {userInfo.name}님의 질문 목록
        </Typography>

        <Stack spacing={3}>
          {questions.length > 0 ? (
            questions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                user={userInfo}
                onCardClick={handleCardClick}
                onAnswerClick={handleAnswerClick}
                onLikeClick={handleLikeClick}
                onBookmarkClick={handleBookmarkClick}
                showActions={true}
              />
            ))
          ) : (
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                backgroundColor:
                  theme.palette.mode === "light" ? "#ffffff" : "#333333",
                border:
                  theme.palette.mode === "light" ? "1px solid #F0F0F0" : "none",
              }}
            >
              <CardContent sx={{ textAlign: "center", py: 6 }}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  아직 등록된 질문이 없습니다
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  첫 번째 질문을 등록해보세요!
                </Typography>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Box>
    </PageContainer>
  );
};

export default TestPage;
