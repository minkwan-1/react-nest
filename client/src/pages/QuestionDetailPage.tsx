import { PageContainer, ComponentWrapper } from "../components/layout/common";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Chip } from "@mui/material";

interface Question {
  id: number;
  title: string;
  content: string;
  tags: string[];
}

const QuestionDetailPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchQuestionDetail() {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/questions/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch question details");
        }
        const data: Question = await response.json();
        setQuestion(data);
      } catch (error) {
        console.error("Error fetching question details:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchQuestionDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <PageContainer>
        <ComponentWrapper>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        </ComponentWrapper>
      </PageContainer>
    );
  }

  if (!question) {
    return <div>Question not found</div>;
  }

  return (
    <PageContainer>
      <ComponentWrapper>
        <Box
          sx={{
            padding: "20px",
            minWidth: "600px",
            border: "1px solid red",
            margin: "0 auto",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Title: {question.title}
          </Typography>
          <Box sx={{ marginBottom: "20px" }}>
            <Typography variant="body1" paragraph>
              <div
                dangerouslySetInnerHTML={{ __html: question.content }}
                style={{ marginBottom: "10px" }}
              />
            </Typography>
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <Typography variant="body2" color="textSecondary">
              Tags:{" "}
              {question.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  sx={{
                    marginRight: "8px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "16px",
                  }}
                />
              ))}
            </Typography>
          </Box>
        </Box>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default QuestionDetailPage;
