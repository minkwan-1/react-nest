import { Box, Typography, Avatar, useTheme, Skeleton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import useFetchMyInfo from "@components/my-info/hooks/useFetchMyInfo";
import { realUserInfo } from "@atom/auth";
import { useAtom } from "jotai";

interface UserInfoSectionProps {
  createdAt: string | Date;
}

const formatDate = (dateInput: string | Date) => {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  return date.toLocaleDateString("ko-KR");
};

const UserInfoSection = ({ createdAt }: UserInfoSectionProps) => {
  const theme = useTheme();
  const [user] = useAtom(realUserInfo);
  const { data: myInfo, isLoading } = useFetchMyInfo(user?.id);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
      }}
    >
      {isLoading ? (
        <>
          <Skeleton variant="circular" width={28} height={28} sx={{ mr: 1 }} />
          <Skeleton variant="text" width={80} height={20} />
          <Skeleton variant="text" width={50} height={20} sx={{ ml: 1 }} />
        </>
      ) : (
        <>
          <Avatar
            src={myInfo?.profileImageUrl}
            sx={{
              width: 28,
              height: 28,
              mr: 1,
              bgcolor: "#b8dae1",
            }}
          >
            <PersonIcon sx={{ fontSize: 16 }} />
          </Avatar>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: theme.palette.text.primary,
            }}
          >
            {myInfo?.nickname}
          </Typography>
          <Typography variant="body2" sx={{ mx: 1, color: "#BDBDBD" }}>
            •
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.primary }}
          >
            {formatDate(createdAt)}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default UserInfoSection;
