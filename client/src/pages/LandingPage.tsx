import { Box, Typography, Button, Container, Chip } from "@mui/material";
import { PageContainer } from "@components/layout/common";
import { useNavigate } from "react-router-dom";
import { aiImage, humanImage, knowledge } from "../images/index";
import { HeroSection, AnimatedSection } from "@components/landing";

const Feature = ({
  imageUrl,
  title,
  description,
  imageSide = "left",
}: {
  imageUrl: string;
  title: string;
  description: string;
  imageSide?: "left" | "right";
}) => {
  return (
    <AnimatedSection
      animation="slideUp"
      direction={imageSide === "left" ? "right" : "left"}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 4, md: 8 },
          flexDirection: {
            xs: "column",
            md: imageSide === "left" ? "row" : "row-reverse",
          },
          mb: 10,
        }}
      >
        <Box sx={{ width: "100%", flex: { md: "1 1 30%" } }}>
          <Box
            sx={{
              borderRadius: "20px",
              overflow: "hidden",
              minHeight: 300,
              height: "100%",
            }}
          >
            <Box
              component="img"
              src={imageUrl}
              alt={title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.4s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
          </Box>
        </Box>
        <Box sx={{ width: "100%", flex: { md: "1 1 70%" } }}>
          <Typography
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: "1.8rem", md: "2.125rem" } }}
          >
            {title}
          </Typography>
          <Typography variant="body1">{description}</Typography>
        </Box>
      </Box>
    </AnimatedSection>
  );
};

const FeaturesSection = () => {
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Typography
          fontWeight="bold"
          textAlign="center"
          sx={{
            mb: 10,
            fontSize: { xs: "2.2rem", md: "3rem" },
          }}
        >
          Pullim의 주요 기능
        </Typography>
        <Feature
          imageUrl={aiImage}
          title="AI의 즉각적인 답변"
          description="질문을 등록하는 순간, AI가 즉시 답변 초안을 생성해드립니다. 기다림 없이 문제 해결의 첫 걸음을 내딛으세요."
          imageSide="left"
        />
        <Feature
          imageUrl={humanImage}
          title="검증된 전문가의 깊이 있는 해결책"
          description="AI의 답변으로 부족했다면, 현직 개발자 및 분야별 전문가들이 직접 코드 리뷰와 함께 명쾌한 해결책을 제시합니다."
          imageSide="right"
        />
        <Feature
          imageUrl={knowledge}
          title="성장으로 이어지는 지식 아카이브"
          description="해결된 질문과 답변들은 누구나 쉽게 찾아볼 수 있는 지식의 보고가 됩니다. 다른 개발자들의 고민을 통해 함께 성장하세요."
          imageSide="left"
        />
      </Container>
    </Box>
  );
};

const PopularTagsSection = () => {
  const tags = [
    "React",
    "TypeScript",
    "Next.js",
    "MUI",
    "LandingPage",
    "Animation",
    "Design",
    "Frontend",
    "Creative",
    "Modern UI",
  ];

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="md">
        <Typography
          fontWeight="bold"
          textAlign="center"
          sx={{
            mb: 6,
            fontSize: { xs: "2.2rem", md: "3rem" },
          }}
        >
          인기 태그
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {tags.map((tag, index) => (
            <AnimatedSection
              key={index}
              animation="grow"
              timeout={500 + index * 100}
            >
              <Chip
                label={tag}
                sx={{
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  p: 2.5,
                  borderRadius: "50px",
                  fontWeight: "medium",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                  transition: "transform 0.2s",
                }}
              />
            </AnimatedSection>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

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
