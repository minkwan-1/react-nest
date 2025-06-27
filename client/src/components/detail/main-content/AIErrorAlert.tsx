import { Alert } from "@mui/material";

type AIErrorAlertProps = {
  aiError: string;
};

const AIErrorAlert = ({ aiError }: AIErrorAlertProps) => {
  return (
    <Alert
      severity="warning"
      sx={{
        mb: 4,
        borderRadius: 3,
        border: "2px solid #f59e0b",
        boxShadow: "0 4px 15px rgba(245, 158, 11, 0.2)",
        "& .MuiAlert-message": {
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontSize: "15px",
          fontWeight: 600,
        },
      }}
    >
      🤖 AI 답변 생성 실패: {aiError}
    </Alert>
  );
};

export default AIErrorAlert;
