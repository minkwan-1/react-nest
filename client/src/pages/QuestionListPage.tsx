import { Box } from "@mui/material";
import { mockQuestions } from "../mock";
import { PageContainer, ComponentWrapper } from "../components/layout/common";
import { QuestionCard, QuestionToolbar } from "../components/question";

export default function QuestionsPage() {
  return (
    <PageContainer>
      <ComponentWrapper>
        <Box sx={{ minWidth: "370px", padding: "20px" }}>
          <QuestionToolbar />
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
