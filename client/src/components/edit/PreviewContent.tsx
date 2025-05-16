import React from "react";
import { Box, Typography, useTheme, alpha } from "@mui/material";

interface PreviewContentProps {
  content: string;
  mainColor?: string;
}

export const PreviewContent: React.FC<PreviewContentProps> = ({
  content,
  mainColor = "#03cb84",
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        mb: 3,
        mt: 4,
        padding: 3,
        borderRadius: "12px",
        backgroundColor: isDarkMode
          ? alpha("#fff", 0.05)
          : alpha("#f5f5f5", 0.7),
        border: `1px solid ${
          isDarkMode ? alpha("#fff", 0.1) : alpha("#000", 0.1)
        }`,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 600,
          color: mainColor,
          display: "flex",
          alignItems: "center",
          "&::before": {
            content: '""',
            display: "inline-block",
            width: "4px",
            height: "16px",
            borderRadius: "2px",
            marginRight: "10px",
            background: `linear-gradient(to bottom, ${mainColor}, #02b279)`,
          },
        }}
      >
        미리보기
      </Typography>
      <div
        className="ql-editor"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
        style={{
          overflow: "auto",
          minHeight: "250px",
        }}
      />
    </Box>
  );
};

export default PreviewContent;
