import {
  Box,
  Typography,
  Container,
  Paper,
  Fade,
  Slide,
  useTheme,
} from "@mui/material";
import { useInView } from "react-intersection-observer";
import AnimatedSection from "./AnimatedSection";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const HeroSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const theme = useTheme();

  const stats = [
    {
      icon: <QuestionAnswerIcon fontSize="medium" />,
      value: "10K+",
      label: "누적 질문과 답변",
    },
    {
      icon: <GroupIcon fontSize="medium" />,
      value: "1,500+",
      label: "답변 전문가",
    },
    {
      icon: <CheckCircleOutlineIcon fontSize="medium" />,
      value: "98%",
      label: "답변 채택률",
    },
  ];

  return (
    <Box ref={ref} sx={{ textAlign: "center" }}>
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Slide in={inView} direction="down" timeout={1000}>
          <Typography
            component="h1"
            sx={{
              fontWeight: "bold",
              mb: 5,
              fontSize: { xs: "2.5rem", sm: "3.2rem", md: "3.75rem" },
            }}
          >
            답답한 문제의 Pullim
          </Typography>
        </Slide>
        <Fade in={inView} timeout={1400} style={{ transitionDelay: "700ms" }}>
          <Typography
            component="p"
            sx={{
              mb: 8,
              fontSize: { xs: "1.1rem", md: "1.25rem" },
            }}
          >
            프로그래밍 문제에 대해 AI의 답변과 개발자들의 답변을 동시에
            제시합니다. <br /> 개발자의 모든 궁금증, 여기서 끝내세요.
          </Typography>
        </Fade>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: theme.spacing(4),
          }}
        >
          {stats.map((stat, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: "100%", sm: "calc(50% - 16px)", md: "30%" },
                minWidth: "280px",
              }}
            >
              <AnimatedSection timeout={800 + index * 500}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: "16px",
                    height: "100%",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-8px)",
                    },
                  }}
                >
                  <Box sx={{ mb: 2 }}>{stat.icon}</Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "2.5rem", md: "3rem" },
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body1">{stat.label}</Typography>
                </Paper>
              </AnimatedSection>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
