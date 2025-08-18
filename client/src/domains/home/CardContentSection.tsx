import { Typography } from "@mui/material";

const CardContentSection = () => {
  return (
    <Typography
      variant="h6"
      sx={{
        fontWeight: "bold",
        mb: 1.5,
        fontSize: "18px",
        lineHeight: 1.4,
        cursor: "pointer",
        "&:hover": { textDecoration: "underline" },
      }}
    >
      리액트에서 비동기 처리란?
    </Typography>
  );
};

export default CardContentSection;
