import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import { PageContainer, ComponentWrapper } from "../components/layout/common";
import { QuestionToolbar } from "../components/question";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Question {
  id: number;
  title: string;
  content: string;
  tags: string[];
}

export default function QuestionListPage() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("http://localhost:3000/questions");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data: Question[] = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    fetchQuestions();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/questions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete question");
      }
      // Remove the deleted question from the local state
      setQuestions(questions.filter((question) => question.id !== id));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <PageContainer>
      <ComponentWrapper>
        <Box sx={{ minWidth: "370px", padding: "20px" }}>
          <QuestionToolbar />
          <Box>
            {questions.map((question) => (
              <Card key={question.id} sx={{ marginBottom: "20px" }}>
                <CardContent>
                  <Typography variant="h6" component="h3">
                    <Link to={`/questions/${question.id}`}>
                      {question.title}
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Tags: {question.tags.join(", ")}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleDelete(question.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>
      </ComponentWrapper>
    </PageContainer>
  );
}
