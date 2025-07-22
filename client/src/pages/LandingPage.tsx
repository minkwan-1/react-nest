import { Box } from "@mui/material";
import { PageContainer } from "@components/layout/common";
import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  PopularTagsSection,
  CTASection,
} from "@components/landing";

const LandingPage = () => {
  return (
    <PageContainer>
      <Box
        sx={(theme) => ({
          ...theme.applyStyles("dark", {
            bgcolor: "black",
          }),
          ...theme.applyStyles("light", {
            bgcolor: "white",
          }),
        })}
      >
        <HeroSection />

        <StatsSection />

        <FeaturesSection />

        <PopularTagsSection />

        <CTASection />
      </Box>
    </PageContainer>
  );
};

export default LandingPage;
