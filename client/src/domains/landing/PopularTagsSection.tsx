import { Box, Typography, Container, Chip } from "@mui/material";
import { AnimatedSection } from "@domains/landing";

const PopularTagsSection = () => {
  const tags = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "Spring",
    "SQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Kubernetes",
    "iOS",
    "Android",
    "AI",
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
                  p: 1,
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
export default PopularTagsSection;
