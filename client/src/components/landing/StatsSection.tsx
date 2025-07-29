import { Box, Container, Typography } from "@mui/material";

const StatsSection = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexWrap: "wrap", textAlign: "center" }}>
          <Box sx={{ width: { xs: "50%", md: "25%" }, p: 2 }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                mb: 1,
                fontSize: { xs: "2.5rem", md: "3rem" },
              }}
            >
              50K+
            </Typography>
            <Typography color="text.secondary">활성 개발자</Typography>
          </Box>
          <Box sx={{ width: { xs: "50%", md: "25%" }, p: 2 }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                mb: 1,
                fontSize: { xs: "2.5rem", md: "3rem" },
              }}
            >
              200K+
            </Typography>
            <Typography color="text.secondary">해결된 질문</Typography>
          </Box>
          <Box sx={{ width: { xs: "50%", md: "25%" }, p: 2 }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                mb: 1,
                fontSize: { xs: "2.5rem", md: "3rem" },
              }}
            >
              95%
            </Typography>
            <Typography color="text.secondary">답변률</Typography>
          </Box>
          <Box sx={{ width: { xs: "50%", md: "25%" }, p: 2 }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                mb: 1,
                fontSize: { xs: "2.5rem", md: "3rem" },
              }}
            >
              24/7
            </Typography>
            <Typography color="text.secondary">커뮤니티 지원</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default StatsSection;
