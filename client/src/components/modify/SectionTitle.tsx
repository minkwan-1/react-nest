import { Typography, useTheme } from "@mui/material";

interface SectionTitleProps {
  title: string;
}

const SectionTitle = ({ title }: SectionTitleProps) => {
  const theme = useTheme();
  const mainColor = "#b8dae1";
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Typography
      variant="h6"
      sx={{
        mb: 1.5,
        fontWeight: 600,
        color: isDarkMode ? "#fff" : "#333",
        display: "flex",
        alignItems: "center",
        "&::before": {
          content: '""',
          display: "inline-block",
          width: "4px",
          height: "16px",
          borderRadius: "2px",
          marginRight: "10px",
          background: `linear-gradient(to bottom, ${mainColor}, #ccaee3)`,
        },
      }}
    >
      {title}
    </Typography>
  );
};

export default SectionTitle;
