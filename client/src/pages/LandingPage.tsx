import { Box } from "@mui/material";
import { PageContainer } from "@components/layout/common";
import {
  HeroSection,
  FeaturesSection,
  PopularTagsSection,
  CTASection,
} from "@components/landing";

const LandingPage = () => {
  return (
    <PageContainer
      sx={{
        position: "relative",
        overflow: "hidden",
        "&::before, &::after": {
          content: '""',
          position: "absolute",
          borderRadius: "50%",
          filter: "blur(150px)",
          zIndex: -1,
        },
        "&::before": {
          width: "30vw",
          height: "30vw",
          top: "5vh",
          left: "-15vw",
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "#aedde5" : "#1e4952",
          opacity: (theme) => (theme.palette.mode === "light" ? 0.9 : 0.25),
        },
        "&::after": {
          width: "40vw",
          height: "40vw",
          top: "90vh",
          right: "-20vw",
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "#aedde5" : "#1e4952",
          opacity: (theme) => (theme.palette.mode === "light" ? 0.8 : 0.2),
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <FeaturesSection />
        <PopularTagsSection />
        <CTASection />
      </Box>

      <Box
        sx={{
          position: "absolute",
          borderRadius: "50%",
          filter: "blur(150px)",
          zIndex: -1,
          width: "35vw",
          height: "35vw",
          bottom: "20vh",
          left: "-10vw",
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "#aedde5" : "#1e4952",
          opacity: (theme) => (theme.palette.mode === "light" ? 0.7 : 0.15),
        }}
      />
    </PageContainer>
  );
};

export default LandingPage;
