import { Box } from "@mui/material";
import { themeColors } from "../../utils/styleUtils";
import { AnswerBadgeProps } from "@components/detail/types";

const AnswerBadge = ({ isAiAnswer }: AnswerBadgeProps) => (
  <Box
    sx={{
      position: "absolute",
      top: 16,
      right: 16,
      bgcolor: isAiAnswer ? themeColors.ai.primary : themeColors.user.primary,
      color: "white",
      px: 2,
      py: 0.8,
      borderRadius: 2,
      fontSize: "12px",
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      gap: 0.5,
      zIndex: 1,
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    }}
  >
    {isAiAnswer ? "🤖 AI 답변" : "👤 사용자 답변"}
  </Box>
);

export default AnswerBadge;
