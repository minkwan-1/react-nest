import React from "react";
import { Box, Typography, useTheme, alpha } from "@mui/material";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          fontSize: { xs: "28px", sm: "36px" },
          letterSpacing: "-0.5px",
          position: "relative",
          display: "inline-block",
          ...theme.applyStyles("dark", {
            color: "#fff",
          }),
          ...theme.applyStyles("light", {
            color: "#000",
          }),
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          ...theme.applyStyles("dark", {
            color: alpha("#fff", 0.7),
          }),
          ...theme.applyStyles("light", {
            color: alpha("#000", 0.6),
          }),
          fontSize: { xs: "15px", sm: "16px" },
          mt: 3,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};
