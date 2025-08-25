import { Box, Avatar, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useFetchMyInfo } from "@domains/my-info/hooks/useFetchMyInfo";

interface User {
  id: number | string;
  name: string;
}

interface Question {
  id: number | string;
  title: string;
  content: string;
  likes?: number;
  thumbnail?: string;
  createdAt?: string | Date;
}

interface CardHeaderSectionProps {
  user: User;
  question: Question;
}

const CardHeaderSection = ({ user, question }: CardHeaderSectionProps) => {
  // user.id를 string으로 변환하여 전달
  const userId = user?.id ? String(user.id) : undefined;

  const { data: myInfo } = useFetchMyInfo(userId);

  // 날짜 포맷팅 함수
  const formatDate = (dateInput: string | Date | undefined) => {
    if (!dateInput) return new Date().toLocaleDateString("ko-KR");
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    return date.toLocaleDateString("ko-KR");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Avatar
        sx={{
          width: 28,
          height: 28,
          mr: 1,
          bgcolor: "#b8dae1",
          fontSize: "14px",
          fontWeight: "bold",
        }}
        src={myInfo?.profileImageUrl}
      >
        {!myInfo?.profileImageUrl && <PersonIcon sx={{ fontSize: 16 }} />}
      </Avatar>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          // color: theme.palette.text.primary,
        }}
      >
        {myInfo?.nickname || user.name}
      </Typography>
      <Typography variant="body2" sx={{ mx: 1, color: "#BDBDBD" }}>
        •
      </Typography>
      <Typography variant="body2">{formatDate(question.createdAt)}</Typography>
    </Box>
  );
};

export default CardHeaderSection;
