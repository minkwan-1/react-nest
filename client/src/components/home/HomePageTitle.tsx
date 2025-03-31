import { Typography, useTheme } from "@mui/material";

const HomePageTitle = () => {
  const theme = useTheme();
  return (
    <Typography
      sx={{
        fontSize: "32px",
        fontWeight: "bold",
        marginBottom: 3,
        ...theme.applyStyles("light", { color: "#212121" }),
        ...theme.applyStyles("dark", { color: "#ffffff" }),
        fontFamily: "'Noto Sans KR', sans-serif",
      }}
    >
      질문 및 답변
    </Typography>
  );
};

export default HomePageTitle;
