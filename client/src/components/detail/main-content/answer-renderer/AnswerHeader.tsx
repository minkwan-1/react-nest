import { Box, Avatar, Typography } from "@mui/material";
import { getAvatarColor } from "@components/detail/utils/styleUtils";
import { formatDate } from "@components/detail/utils/formatUtils";
import { themeColors } from "../../utils/styleUtils";
import { AnswerHeaderProps } from "@components/detail/types";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";
import useFetchMyInfo from "@components/my-info/hooks/useFetchMyInfo";

const AnswerHeader = ({ answer }: AnswerHeaderProps) => {
  const [realUser] = useAtom(realUserInfo);
  const myInfo = useFetchMyInfo(realUser?.id);
  const userProfileImage =
    !answer.isAiAnswer && myInfo?.profileImageUrl
      ? myInfo.profileImageUrl
      : undefined;
  const userName = answer.isAiAnswer
    ? "AI Assistant"
    : realUser?.name ?? "사용자";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Avatar
        sx={{
          width: 40,
          height: 40,
          bgcolor: !userProfileImage
            ? getAvatarColor(answer.userId, answer.isAiAnswer)
            : undefined,
          mr: 2.5,
          fontSize: "16px",
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        src={userProfileImage}
      >
        {!userProfileImage && (answer.isAiAnswer ? "🤖" : userName.charAt(0))}
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
          {userName}
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
};

export default AnswerHeader;
