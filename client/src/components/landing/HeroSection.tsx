import { Container, Typography, Chip, Stack } from "@mui/material";

const HeroSection = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        textAlign: "center",
        py: { xs: 8, md: 10 },
      }}
    >
      <Chip
        label="🚀 개발자를 위한 Q&A 플랫폼"
        sx={{
          mb: 4,
          backgroundColor: "#b8dae1",
          color: "#555",
          fontWeight: 500,
        }}
      />
      <Typography
        variant="h2"
        sx={(theme) => ({
          fontWeight: "bold",
          fontSize: { xs: "2.5rem", sm: "3.2rem", md: "3.75rem" },
          mb: 3,
          background:
            theme.palette.mode === "dark"
              ? `linear-gradient(to right, ${theme.palette.grey[200]}, ${theme.palette.primary.light})`
              : `linear-gradient(to right, ${theme.palette.primary.dark}, #b8dae1)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        })}
      >
        코딩 문제,
        <br />
        함께 해결해요
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{
          mb: 4,
          maxWidth: "700px",
          mx: "auto",
          fontSize: { xs: "1rem", md: "1.25rem" },
        }}
      >
        함께 프로그래밍 문제를 해결하고, 지식을 공유하며 성장하는
        커뮤니티입니다.
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
      ></Stack>
    </Container>
  );
};

export default HeroSection;
