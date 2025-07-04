import { Box, Card, CardContent, useTheme } from "@mui/material";
import {
  CardHeaderSection,
  CardContentSection,
  CardActionsSection,
  ThumbnailSection,
  CardSubtitle,
} from "./index";

const HomeQuestionCard = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        transition: "all 0.3s",
        "&:hover": {
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          transform: "translateY(-2px)",
          backgroundColor:
            theme.palette.mode === "light" ? "#F5F5F5" : "#4F4F4F",
        },
        backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "#333333",
        border: theme.palette.mode === "light" ? "1px solid #F0F0F0" : "none",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <CardHeaderSection />

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
          {/* Content */}
          <Box sx={{ flex: 1 }}>
            <CardContentSection />

            {/* subtitle */}
            <CardSubtitle />

            {/* Actions */}

            <CardActionsSection />
          </Box>

          {/* Thumbnail */}
          <ThumbnailSection />
        </Box>
      </CardContent>
    </Card>
  );
};

export default HomeQuestionCard;
