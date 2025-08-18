import { Box } from "@mui/material";
import { themeColors } from "../../utils/styleUtils";
import { AnswerBadgeProps } from "@domains/detail/types";

const AnswerBadge = ({ isAiAnswer }: AnswerBadgeProps) => (
  <Box
    sx={{
      position: "absolute",
      top: 12,
      right: 12,
      px: 1.5,
      py: 0.5,
      fontSize: "11px",
      fontWeight: 600,
      bgcolor: isAiAnswer ? themeColors.ai.primary : themeColors.user.primary,
      borderRadius: "9999px",
      zIndex: 1,
    }}
  >
    {isAiAnswer ? "🤖 AI" : "👤 사용자"}
  </Box>
);

export default AnswerBadge;
