import React from "react";
import { Box, Container } from "@mui/material";
import RightContentArea from "./RightContentArea";
import LeftContentArea from "./LeftContentArea";
import { useUserQuestions } from "./hooks/useUserQuestions";

const UserProfile: React.FC = () => {
  useUserQuestions();

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          height: { xs: 50, md: 100 },
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
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
          <LeftContentArea />
          <RightContentArea />
        </Box>
      </Container>
    </Box>
  );
};

export default UserProfile;
