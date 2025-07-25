import React from "react";
import { Box, Typography, useTheme, alpha } from "@mui/material";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  mainColor?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          fontSize: { xs: "28px", sm: "36px" },
          background: theme.palette.mode === "dark" ? "#fff" : "#000",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-0.5px",

          position: "relative",
          display: "inline-block",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: isDarkMode ? alpha("#fff", 0.7) : alpha("#000", 0.6),
          fontSize: { xs: "15px", sm: "16px" },
          mt: 3,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};
