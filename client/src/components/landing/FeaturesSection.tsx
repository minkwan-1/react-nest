import { Box, Container, Typography, Card, CardContent } from "@mui/material";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import CodeIcon from "@mui/icons-material/Code";
import GroupIcon from "@mui/icons-material/Group";

const FeaturesSection = () => {
  const featureCards = [
    {
      icon: (
        <QuestionAnswerOutlinedIcon
          sx={{
            fontSize: 32,
            color: "#b8dae1",
          }}
        />
      ),
      title: "실시간 Q&A",
      description:
        "프로그래밍 문제를 실시간으로 질문하고 빠른 답변을 받아보세요.",
    },
    {
      icon: <CodeIcon sx={{ fontSize: 32, color: "#b8dae1" }} />,
      title: "코드 하이라이팅",
      description:
        "모든 프로그래밍 언어를 지원하는 고급 코드 에디터를 제공합니다.",
    },
    {
      icon: <GroupIcon sx={{ fontSize: 32, color: "#b8dae1" }} />,
      title: "전문가 커뮤니티",
      description:
        "경험 많은 개발자들과 함께 문제를 해결하고 지식을 공유하세요.",
    },
  ];
  return (
    <Box
      id="features"
      sx={(theme) => ({
        py: { xs: 8, md: 10 },
        borderTop:
          theme.palette.mode === "light"
            ? `1px solid ${theme.palette.divider}`
            : "none",
      })}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={2}
            sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
          >
            왜 Pullim을 선택해야 할까요?
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: "700px",
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.125rem" },
            }}
          >
            개발자들이 필요로 하는 모든 기능을 하나의 플랫폼에서 제공합니다.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", mx: -2 }}>
          {featureCards.map((card, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: "100%", sm: "100%", md: "calc(100% / 3)" },
                p: 2,
              }}
            >
              <Card
                sx={(theme) => ({
                  height: "100%",
                  bgcolor: "background.paper",
                  boxShadow: theme.shadows[2],
                  transition: "box-shadow 0.3s",
                  "&:hover": { boxShadow: theme.shadows[8] },
                  border: theme.palette.mode === "dark" ? "1px solid" : "none",
                  borderColor: "grey.800",
                })}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
