import { Box, Avatar, Typography } from "@mui/material";
import { getAvatarColor } from "@components/detail/utils/styleUtils";
import { getUserName, formatDate } from "@components/detail/utils/formatUtils";
import { themeColors } from "../../utils/styleUtils";
import { AnswerHeaderProps } from "@components/detail/types";

const AnswerHeader = ({ answer }: AnswerHeaderProps) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
    <Avatar
      sx={{
        width: 40,
        height: 40,
        bgcolor: getAvatarColor(answer.userId, answer.isAiAnswer),
        mr: 2.5,
        fontSize: "16px",
        fontWeight: 600,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {answer.isAiAnswer ? "🤖" : getUserName(answer.userId).charAt(0)}
    </Avatar>
    <Box sx={{ flex: 1 }}>
      <Typography
        variant="subtitle1"
        sx={{
          color: answer.isAiAnswer
            ? themeColors.ai.primary
            : themeColors.user.primary,
          fontWeight: 700,
          fontSize: "16px",
        }}
      >
        {getUserName(answer.userId, answer.isAiAnswer)}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: themeColors.textSecondary,
          fontSize: "13px",
          mt: 0.5,
        }}
      >
        {formatDate(answer.createdAt)}
      </Typography>
    </Box>
  </Box>
);

export default AnswerHeader;
