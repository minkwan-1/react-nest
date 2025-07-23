import { Box, Avatar, Typography, useTheme } from "@mui/material";

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
  const theme = useTheme();

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
      >
        {user.name?.charAt(0) || "U"}
      </Avatar>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          color: theme.palette.text.primary,
        }}
      >
        {user.name}
      </Typography>
      <Typography variant="body2" sx={{ mx: 1, color: "#BDBDBD" }}>
        •
      </Typography>
      <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
        {new Date(question.createdAt || Date.now()).toLocaleDateString("ko-KR")}
      </Typography>
    </Box>
  );
};

export default CardHeaderSection;
