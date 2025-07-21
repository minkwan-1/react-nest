import React from "react";
import { Box, Container, useTheme } from "@mui/material";
import RightContentArea from "./RightContentArea";
import LeftContentArea from "./LeftContentArea";
import { useUserQuestions } from "./hooks/useUserQuestions";

interface UserProfileProps {
  username: string;
  avatarUrl: string;
  reputation: number;
  badges: string[];
  questionsAnswered: number;
  questionsAsked: number;
  bio: string;
}

const UserProfile: React.FC<UserProfileProps> = () => {
  const theme = useTheme();
  const themeColors = {
    primary: theme.palette.primary.main,
    primaryDark: "#02b676",
    background: theme.palette.mode === "light" ? "#f8f9fa" : "#121212",
    cardBg: theme.palette.background.paper,
    border: theme.palette.mode === "light" ? "#e0e0e0" : "#333333",
    textPrimary: theme.palette.text.primary,
    textSecondary: theme.palette.text.secondary,
    divider: theme.palette.mode === "light" ? "#e0e0e0" : "#424242",
  };

  useUserQuestions();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: themeColors.background,
      }}
    >
      {/* Header Banner */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 50, md: 100 },
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          mt: { xs: -6, md: -8 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          {/* Left Sidebar */}
          <LeftContentArea />

          {/* Right Content Area */}
          <RightContentArea />
        </Box>
      </Container>
    </Box>
  );
};

export default UserProfile;
