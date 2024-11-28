import { TextField, Button, Box, Typography } from "@mui/material";

import { PageContainer, ComponentWrapper } from "../components/layout/common";
import { QuestionCard } from "../components/question/QuestionCard";

const mockQuestions = [
  {
    id: 1,
    title: "How to center a div in CSS?",
    votes: 42,
    answers: 5,
    views: 1000,
    tags: ["css", "html", "flexbox"],
    askedBy: "JohnDoe",
    askedAt: "2023-07-15",
  },
  {
    id: 2,
    title: "What's the difference between let and const in JavaScript?",
    votes: 38,
    answers: 3,
    views: 800,
    tags: ["javascript", "es6"],
    askedBy: "JaneSmith",
    askedAt: "2023-07-14",
  },
  {
    id: 3,
    title: "How to handle state in React functional components?",
    votes: 55,
    answers: 7,
    views: 1500,
    tags: ["react", "hooks", "state-management"],
    askedBy: "ReactLover",
    askedAt: "2023-07-13",
  },
  {
    id: 4,
    title: "What is the difference between == and === in JavaScript?",
    votes: 25,
    answers: 4,
    views: 600,
    tags: ["javascript", "comparison", "es6"],
    askedBy: "CodeNinja",
    askedAt: "2023-07-12",
  },
  {
    id: 5,
    title: "How to optimize a SQL query for better performance?",
    votes: 65,
    answers: 9,
    views: 2500,
    tags: ["sql", "database", "performance"],
    askedBy: "DataGuru",
    askedAt: "2023-07-11",
  },
  {
    id: 6,
    title: "What are the best practices for writing clean code?",
    votes: 80,
    answers: 12,
    views: 3000,
    tags: ["clean-code", "best-practices", "programming"],
    askedBy: "CodeMaster",
    askedAt: "2023-07-10",
  },
  {
    id: 7,
    title: "How to fix CORS issues in a React application?",
    votes: 40,
    answers: 6,
    views: 1200,
    tags: ["react", "cors", "api"],
    askedBy: "FrontendFan",
    askedAt: "2023-07-09",
  },
  {
    id: 8,
    title: "What is the difference between HTTP and HTTPS?",
    votes: 30,
    answers: 5,
    views: 900,
    tags: ["http", "https", "networking"],
    askedBy: "WebDev",
    askedAt: "2023-07-08",
  },
  {
    id: 9,
    title: "How to set up a Node.js server with Express?",
    votes: 50,
    answers: 8,
    views: 1800,
    tags: ["nodejs", "express", "server"],
    askedBy: "BackendBuilder",
    askedAt: "2023-07-07",
  },
  {
    id: 10,
    title: "What are React context and how to use it effectively?",
    votes: 72,
    answers: 10,
    views: 2200,
    tags: ["react", "context", "state-management"],
    askedBy: "ReactPro",
    askedAt: "2023-07-06",
  },
];

export default function QuestionsPage() {
  return (
    <PageContainer>
      <ComponentWrapper>
        <Box sx={{ minWidth: "370px", padding: "20px" }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Top Questions
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search..."
              sx={{ flex: 1, mr: 2 }}
            />
            <Button
              sx={{ background: "black", color: "white", minHeight: "55px" }}
            >
              Ask Question
            </Button>
          </Box>
          <Box>
            {mockQuestions.map((question) => (
              <QuestionCard key={question.id} {...question} />
            ))}
          </Box>
        </Box>
      </ComponentWrapper>
    </PageContainer>
  );
}
