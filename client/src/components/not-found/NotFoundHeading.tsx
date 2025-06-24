import { Typography } from "@mui/material";

type NotFoundHeadingProps = {
  mainColor: string;
  accentColor: string;
};

const NotFoundHeading = ({ mainColor, accentColor }: NotFoundHeadingProps) => {
  return (
    <Typography
      variant="h1"
      fontWeight="bold"
      sx={{
        mb: 2,
        fontSize: { xs: "100px", md: "140px" },
        background: `linear-gradient(135deg, ${mainColor} 0%, ${accentColor} 100%)`,
        backgroundClip: "text",
        textFillColor: "transparent",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textShadow: `0 5px 15px ${mainColor}40`,
      }}
    >
      404
    </Typography>
  );
};

export default NotFoundHeading;
