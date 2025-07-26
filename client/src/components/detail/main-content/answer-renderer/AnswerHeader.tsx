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
  const { data: myInfo } = useFetchMyInfo(realUser?.id);

  const userProfileImage =
    !answer.isAiAnswer && myInfo?.profileImageUrl
      ? myInfo.profileImageUrl
      : undefined;

  const userName = answer.isAiAnswer
    ? "AI Assistant"
    : realUser?.name ?? "사용자";

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Avatar
        sx={{
          width: 36,
          height: 36,
          bgcolor: !userProfileImage
            ? getAvatarColor(answer.userId, answer.isAiAnswer)
            : undefined,
          fontSize: "14px",
          fontWeight: 600,
          mr: 2,
        }}
        src={userProfileImage}
      >
        {!userProfileImage && (answer.isAiAnswer ? "🤖" : userName.charAt(0))}
      </Avatar>

      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            color: answer.isAiAnswer
              ? themeColors.ai.primary
              : themeColors.user.primary,
            fontWeight: 600,
            fontSize: "15px",
          }}
        >
          {myInfo?.nickname}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: themeColors.textSecondary,
            fontSize: "12px",
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
