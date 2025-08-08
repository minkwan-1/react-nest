import { Box, Fade } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { PageContainer } from "@components/layout/common";
import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  PopularTagsSection,
  CTASection,
} from "@components/landing";

const LandingPage = () => {
  const commonOptions = {
    triggerOnce: true,
    threshold: 0.1,
  };

  const { ref: heroRef, inView: heroInView } = useInView(commonOptions);
  const { ref: statsRef, inView: statsInView } = useInView(commonOptions);
  const { ref: featuresRef, inView: featuresInView } = useInView(commonOptions);
  const { ref: tagsRef, inView: tagsInView } = useInView(commonOptions);
  const { ref: ctaRef, inView: ctaInView } = useInView(commonOptions);

  return (
    <PageContainer>
      <Box>
        <div ref={heroRef}>
          <Fade in={heroInView} timeout={1000}>
            <div>
              <HeroSection />
            </div>
          </Fade>
        </div>

        <div ref={statsRef}>
          <Fade in={statsInView} timeout={1000}>
            <div>
              <StatsSection />
            </div>
          </Fade>
        </div>

        <div ref={featuresRef}>
          <Fade in={featuresInView} timeout={1000}>
            <div>
              <FeaturesSection />
            </div>
          </Fade>
        </div>

        <div ref={tagsRef}>
          <Fade in={tagsInView} timeout={1000}>
            <div>
              <PopularTagsSection />
            </div>
          </Fade>
        </div>

        <div ref={ctaRef}>
          <Fade in={ctaInView} timeout={1000}>
            <div>
              <CTASection />
            </div>
          </Fade>
        </div>
      </Box>
    </PageContainer>
  );
};

export default LandingPage;
