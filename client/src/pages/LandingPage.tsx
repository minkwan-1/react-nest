import { PageContainer } from "@components/layout/common";

import {
  HeroSection,
  FeaturesSection,
  PopularTagsSection,
  CTASection,
} from "@components/landing";

const LandingPage = () => {
  return (
    <PageContainer>
      <HeroSection />
      <FeaturesSection />
      <PopularTagsSection />
      <CTASection />
    </PageContainer>
  );
};

export default LandingPage;
