import { Box, Container, Typography, useTheme } from "@mui/material";

const StatsSection = () => {
  const theme = useTheme();
  return (
    <Box
      // sx={(theme) => ({
      //   py: { xs: 6, md: 8 },
      //   backgroundColor: theme.palette.background.paper,
      //   borderTop:
      //     theme.palette.mode === "light"
      //       ? `1px solid ${theme.palette.divider}`
      //       : "none",
      // })}
      sx={{
        py: { xs: 6, md: 8 },
        ...theme.applyStyles("dark", {
          backgroundColor: "black",
          borderBottom: "1px solid #616161",
        }),
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexWrap: "wrap", textAlign: "center" }}>
          <Box sx={{ width: { xs: "50%", md: "25%" }, p: 2 }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                color: "primary.dark",
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
                color: "secondary.main",
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
                color: "success.main",
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
                color: "warning.main",
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
