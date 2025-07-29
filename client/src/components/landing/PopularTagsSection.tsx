import { Box, Container, Typography, Chip } from "@mui/material";

const PopularTagsSection = () => {
  const popularTags = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "TypeScript",
    "Java",
    "C++",
    "Go",
    "Rust",
    "Vue.js",
    "Angular",
    "Docker",
    "Kubernetes",
    "AWS",
    "MongoDB",
    "PostgreSQL",
    "GraphQL",
    "Next.js",
  ];
  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={1}
            sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
          >
            인기 기술 태그
          </Typography>
          <Typography color="text.secondary">
            가장 활발하게 논의되는 프로그래밍 기술들
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: { xs: 1, sm: 1.5 },
          }}
        >
          {popularTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              component="a"
              href="#"
              clickable
              sx={{
                px: { xs: 1, sm: 2 },
                py: { xs: 2, sm: 2.5 },
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: "#b8dae1",
                  color: "#1A2027",
                  transform: "translateY(-2px)",
                },
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default PopularTagsSection;
