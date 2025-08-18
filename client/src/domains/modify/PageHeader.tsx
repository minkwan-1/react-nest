import React from "react";
import { Box, Typography } from "@mui/material";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  mainColor?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          fontSize: { xs: "28px", sm: "36px" },
          color: "text.primary",
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
          color: "text.secondary",
          fontSize: { xs: "15px", sm: "16px" },
          mt: 3,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};
