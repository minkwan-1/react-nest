import { Typography } from "@mui/material";

type UnauthorizedHeadingProps = {
  mainColor: string;
  accentColor: string;
};

const UnauthorizedHeading = ({
  mainColor,
  accentColor,
}: UnauthorizedHeadingProps) => {
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
      401
    </Typography>
  );
};

export default UnauthorizedHeading;
