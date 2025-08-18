import React from "react";
import { Box, Typography, useTheme, alpha } from "@mui/material";

const TermSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const theme = useTheme();
  const mainColor = "#b8dae1";
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box sx={{ marginTop: "10px" }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 700,
          fontSize: { xs: "18px", sm: "20px" },
          color: isDarkMode ? mainColor : "#ccaee3",
          mb: 2,
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
      <Typography
        variant="body1"
        sx={{
          color: isDarkMode ? alpha("#fff", 0.8) : alpha("#000", 0.7),
          lineHeight: 1.7,
          fontSize: "15px",
          paddingLeft: "14px",
          borderLeft: `1px solid ${alpha(mainColor, 0.3)}`,
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default TermSection;
