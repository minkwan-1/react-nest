import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={(theme) => ({
        py: { xs: 8, md: 10 },
        textAlign: "center",
        ...theme.applyStyles("dark", {
          bgcolor: "black",
          color: "white",
        }),
        ...theme.applyStyles("light", {
          bgcolor: "white",
          color: "black",
          borderTop: `1px solid ${theme.palette.divider}`,
        }),
      })}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          fontWeight="bold"
          mb={3}
          sx={{ fontSize: { xs: "2.2rem", md: "3rem" } }}
        >
          지금 바로 시작하세요
        </Typography>
        <Typography
          variant="h6"
          sx={{ mb: 4, opacity: 0.9, fontSize: { xs: "1rem", md: "1.25rem" } }}
        >
          수천 명의 개발자들이 이미 Pullim에서 문제를 해결하고 있습니다. 당신도
          함께하세요!
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            onClick={() => navigate("/home")}
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              bgcolor: "#b8dae1",
              color: "#555",
              "&:hover": {
                bgcolor: "#a0c7d1",
              },
            }}
          >
            더 알아보기
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default CTASection;
