import { Card, CardContent, Divider } from "@mui/material";
import { themeColors } from "../../utils/styleUtils";
import { AnswerCardProps } from "@components/detail/types";
import { AnswerBadge, AnswerHeader, AnswerContent } from "./index";

const AnswerCard = ({ answer }: AnswerCardProps) => {
  return (
    <Card
      sx={{
        mb: 3,
        border: answer.isAiAnswer
          ? `2px solid ${themeColors.ai.primary}`
          : `2px solid ${themeColors.user.primary}`,
        borderRadius: 3,
        boxShadow: answer.isAiAnswer
          ? "0 4px 20px rgba(133, 193, 204, 0.2)"
          : "0 4px 20px rgba(168, 209, 219, 0.2)",
        "&:hover": {
          boxShadow: answer.isAiAnswer
            ? "0 8px 25px rgba(133, 193, 204, 0.3)"
            : "0 8px 25px rgba(168, 209, 219, 0.3)",
          transform: "translateY(-2px)",
        },
        position: "relative",
        backgroundColor: answer.isAiAnswer
          ? themeColors.ai.light
          : themeColors.user.light,
        transition: "all 0.3s ease",
      }}
    >
      <AnswerBadge isAiAnswer={answer.isAiAnswer} />

      <CardContent sx={{ p: 4 }}>
        <AnswerHeader answer={answer} />

        <Divider
          sx={{
            mb: 3,
            borderColor: answer.isAiAnswer
              ? themeColors.ai.border
              : themeColors.user.border,
            borderWidth: "1px",
          }}
        />

        <AnswerContent answer={answer} />
      </CardContent>
    </Card>
  );
};

export default AnswerCard;
