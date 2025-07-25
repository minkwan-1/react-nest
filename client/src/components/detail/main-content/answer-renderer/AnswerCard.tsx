import { Card, CardContent, Divider, useTheme } from "@mui/material";
import { themeColors } from "../../utils/styleUtils";
import { AnswerCardProps } from "@components/detail/types";
import { AnswerBadge, AnswerHeader, AnswerContent } from "./index";

const AnswerCard = ({ answer }: AnswerCardProps) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const baseColor = answer.isAiAnswer ? themeColors.ai : themeColors.user;

  return (
    <Card
      sx={{
        mb: 4,
        borderRadius: 6,
        border: `1px solid ${baseColor.primary}`,
        backgroundColor: isDarkMode ? baseColor.dark : baseColor.light,
        boxShadow: isDarkMode
          ? "0 4px 24px rgba(0, 0, 0, 0.2)"
          : "0 4px 24px rgba(0, 0, 0, 0.06)",
        transition: "all 0.25s ease-in-out",
        position: "relative",
        "&:hover": {
          boxShadow: isDarkMode
            ? "0 8px 32px rgba(0, 0, 0, 0.25)"
            : "0 8px 32px rgba(0, 0, 0, 0.1)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <AnswerBadge isAiAnswer={answer.isAiAnswer} />
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <AnswerHeader answer={answer} />
        <Divider
          sx={{
            my: 3,
            borderColor: isDarkMode
              ? `${baseColor.primary}33`
              : baseColor.border,
            borderWidth: 1,
          }}
        />
        <AnswerContent answer={answer} />
      </CardContent>
    </Card>
  );
};

export default AnswerCard;
