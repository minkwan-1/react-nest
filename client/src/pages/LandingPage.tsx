import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper } from "@mui/material";
import { CheckCircle, Target, Zap, Code } from "lucide-react";
import { PageContainer, ComponentWrapper } from "../components/layout/common";

const LandingPage = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "질문과 답변의 힘",
      description: "커뮤니티에서 다양한 질문과 답변을 통해 문제를 해결합니다.",
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "실시간 피드백",
      description: "전문가 및 개발자들이 실시간으로 피드백을 제공합니다.",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "빠른 문제 해결",
      description:
        "다양한 주제에 대한 빠르고 정확한 답변을 통해 효율적으로 문제를 해결합니다.",
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "협업 및 학습 기회",
      description: "다양한 개발자와 협업하며 성장할 수 있는 기회를 제공합니다.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "질문하기",
      description: "자신이 궁금한 문제를 사이트에 질문합니다.",
    },
    {
      number: "02",
      title: "답변 받기",
      description: "커뮤니티에서 제공하는 답변을 확인하고 토론합니다.",
    },
    {
      number: "03",
      title: "해결책 적용",
      description: "받은 답변을 바탕으로 문제를 해결합니다.",
    },
    {
      number: "04",
      title: "피드백 제공",
      description: "다른 사용자에게 피드백을 제공하여 커뮤니티에 기여합니다.",
    },
  ];

  return (
    <PageContainer>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(to right, black, white)",
          color: "#fff",
          padding: "100px 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box maxWidth="lg" style={{ textAlign: "center" }}>
          <Typography variant="h3" gutterBottom style={{ fontWeight: 700 }}>
            개발자를 위한 Q&A, RealCode_
          </Typography>
          <Typography variant="h5" paragraph style={{ marginBottom: "32px" }}>
            다양한 질문과 답변을 통해 개발 지식을 넓히세요.
          </Typography>
          <Button
            sx={{
              marginTop: "50px",
              bgcolor: "black",
              color: "white",
              width: "250px",
              height: "50px",
            }}
            onClick={() => navigate("/auth")}
          >
            지금 시작하기
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box
        id="features"
        sx={{
          padding: "80px 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: (theme) => {
                return {
                  ...theme.applyStyles("light", {
                    color: "black",
                  }),
                  ...theme.applyStyles("dark", {
                    color: "white",
                  }),
                };
              },
            }}
          >
            RealCode_의 특징
          </Typography>
          <Box
            sx={{
              marginTop: "80px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              gap: 4,
            }}
          >
            {features.map((feature, index) => (
              <Box
                key={index}
                sx={{ flexBasis: "calc(50% - 16px)", textAlign: "center" }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: "24px",
                    borderRadius: "8px",
                    minHeight: "200px",
                    minWidth: "200px",
                  }}
                >
                  <Box mb={3}>{feature.icon}</Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Process Section */}
      <ComponentWrapper>
        <Box sx={{ py: 8 }}>
          <Box maxWidth="lg" sx={{ margin: "0 auto" }}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: 700, marginTop: "80px" }}
            >
              Q&A 참여 프로세스
            </Typography>
            <Box
              sx={{
                marginTop: "80px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                gap: 4,
              }}
            >
              {steps.map((step, index) => (
                <Box
                  key={index}
                  sx={{ flexBasis: "calc(50% - 16px)", textAlign: "center" }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      padding: "24px",
                      minHeight: 250,
                      gap: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "black",
                        color: "white",
                        borderRadius: "50%",

                        width: 48,
                        height: 48,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 16px",
                      }}
                    >
                      <Typography variant="h6">{step.number}</Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {step.description}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </ComponentWrapper>

      {/* Contact Section */}
      <Box
        id="contact"
        sx={{ backgroundColor: "#18181a", color: "white", py: 8 }}
      >
        <Box maxWidth="lg" sx={{ margin: "0 auto", textAlign: "center" }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Q&A에 참여할 준비가 되셨나요?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            지금 RealCode_에서 다양한 질문과 답변을 경험하세요!
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="#contact"
            onClick={() => navigate("/auth")}
            sx={{
              fontWeight: 700,
              textTransform: "none",
              bgcolor: "white",
              color: "black",
            }}
          >
            지금 시작하기
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default LandingPage;
