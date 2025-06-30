import { Card, CardContent, Divider, useTheme } from "@mui/material";
import { themeColors } from "../../utils/styleUtils";
import { AnswerCardProps } from "@components/detail/types";
import { AnswerBadge, AnswerHeader, AnswerContent } from "./index";

const AnswerCard = ({ answer }: AnswerCardProps) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const getCardStyles = () => {
    const baseColor = answer.isAiAnswer ? themeColors.ai : themeColors.user;

    return {
      mb: 3,
      border: `2px solid ${baseColor.primary}`,
      borderRadius: 3,
      boxShadow: answer.isAiAnswer
        ? isDarkMode
          ? "0 4px 20px rgba(133, 193, 204, 0.15)"
          : "0 4px 20px rgba(133, 193, 204, 0.2)"
        : isDarkMode
        ? "0 4px 20px rgba(168, 209, 219, 0.15)"
        : "0 4px 20px rgba(168, 209, 219, 0.2)",
      "&:hover": {
        boxShadow: answer.isAiAnswer
          ? isDarkMode
            ? "0 8px 25px rgba(133, 193, 204, 0.25)"
            : "0 8px 25px rgba(133, 193, 204, 0.3)"
          : isDarkMode
          ? "0 8px 25px rgba(168, 209, 219, 0.25)"
          : "0 8px 25px rgba(168, 209, 219, 0.3)",
        transform: "translateY(-2px)",
      },
      position: "relative",
      backgroundColor: isDarkMode ? baseColor.dark : baseColor.light,
      transition: "all 0.3s ease",
    };
  };

  const getDividerColor = () => {
    const baseColor = answer.isAiAnswer ? themeColors.ai : themeColors.user;
    return isDarkMode
      ? `${baseColor.primary}40` // 투명도 적용
      : baseColor.border;
  };

  return (
    <Card sx={getCardStyles()}>
      <AnswerBadge isAiAnswer={answer.isAiAnswer} />

      <CardContent sx={{ p: 4 }}>
        <AnswerHeader answer={answer} />

        <Divider
          sx={{
            mb: 3,
            borderColor: getDividerColor(),
            borderWidth: "1px",
          }}
        />

        <AnswerContent answer={answer} />
      </CardContent>
    </Card>
  );
};

export default AnswerCard;
