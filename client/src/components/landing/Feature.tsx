import { Box, Typography } from "@mui/material";
import { AnimatedSection } from "@components/landing";

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

export default Feature;
