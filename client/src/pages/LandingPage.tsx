import { Box, Typography, Button, Container } from "@mui/material";
import { PageContainer } from "@components/layout/common";
import { useNavigate } from "react-router-dom";
import {
  HeroSection,
  AnimatedSection,
  FeaturesSection,
  PopularTagsSection,
} from "@components/landing";

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ py: 12 }}>
      <Container maxWidth="md">
        <AnimatedSection animation="fade" timeout={1500}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              fontWeight="bold"
              sx={{
                mb: 3,
                fontSize: { xs: "2.2rem", md: "3rem" },
              }}
            >
              이제 당신의 문제를 해결할 시간입니다
            </Typography>
            <Typography
              sx={{
                mb: 4,
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            >
              혼자 고민하는 시간은 그만. Pullim의 지성이 당신의 성장을
              가속화합니다.
            </Typography>
            <Button
              onClick={() => navigate("/home")}
              size="large"
              sx={{
                py: 1.5,
                px: 6,
                fontSize: { xs: "1rem", md: "1.1rem" },
                borderRadius: "50px",
                fontWeight: "bold",
                bgcolor: "#b8dae1",
                color: "black",
              }}
            >
              더 알아보기
            </Button>
          </Box>
        </AnimatedSection>
      </Container>
    </Box>
  );
};

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
