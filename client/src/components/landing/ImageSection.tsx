import { Box, useTheme, keyframes } from "@mui/material";

const expandLine = keyframes`
  0% { width: var(--initial-width); }
  50% { width: var(--expanded-width); }
  100% { width: var(--initial-width); }
`;

const blink = keyframes`
  0% { opacity: 0.7; }
  50% { opacity: 0.9; }
  100% { opacity: 0.7; }
`;

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

interface ImageSectionProps {
  isMobile?: boolean;
}

const ImageSection = ({ isMobile = false }: ImageSectionProps) => {
  const theme = useTheme();

  const getAnimationProps = (index: number) => {
    const initialWidth = Math.random() * 30 + 40;
    const expandedWidth = Math.min(initialWidth + Math.random() * 10, 80);
    const delay = (index * 0.4) % 3;
    const duration = Math.random() * 2 + 4;

    return {
      "--initial-width": `${initialWidth}%`,
      "--expanded-width": `${expandedWidth}%`,
      animation: `${expandLine} ${duration}s ease-in-out infinite ${delay}s`,
      ...(index % 7 === 0 && {
        animation: `${expandLine} ${duration}s ease-in-out infinite ${delay}s, ${blink} ${
          duration / 2
        }s ease-in-out infinite`,
      }),
    };
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "40%" },
        height: { xs: "250px", sm: "300px", md: "auto" },
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        order: { xs: 1, md: 2 },
        mb: { xs: 2, md: 0 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: isMobile ? "200px" : "80%",
          height: isMobile ? "200px" : "60%",
          maxWidth: { xs: "280px", sm: "350px", md: "none" },
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          animation: `${float} 8s ease-in-out infinite`,
          transform: "translateZ(0)",
          ...theme.applyStyles("light", { bgcolor: "#03cb84" }),
          ...theme.applyStyles("dark", { bgcolor: "#00775a" }),
          boxShadow:
            theme.palette.mode === "light"
              ? "0 15px 30px rgba(3, 203, 132, 0.3)"
              : "0 15px 30px rgba(0, 119, 90, 0.3)",
        }}
      >
        <Box
          sx={{
            width: "80%",
            height: "80%",
            borderRadius: "6px",
            p: isMobile ? 1.5 : 2,
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 1 : 1.5,
            position: "relative",
            ...theme.applyStyles("light", { bgcolor: "#1e1e1e" }),
            ...theme.applyStyles("dark", { bgcolor: "#000" }),
            "&::before": {
              content: '""',
              position: "absolute",
              top: isMobile ? 10 : 15,
              left: isMobile ? 8 : 10,
              width: isMobile ? 6 : 8,
              height: isMobile ? 6 : 8,
              borderRadius: "50%",
              backgroundColor: "red",
              boxShadow: isMobile
                ? "12px 0 0 yellow, 24px 0 0 green"
                : "16px 0 0 yellow, 32px 0 0 green",
              opacity: 0.7,
            },
          }}
        >
          <Box sx={{ mt: isMobile ? 3 : 4 }}>
            {Array.from({ length: isMobile ? 5 : 8 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  height: isMobile ? "6px" : "8px",
                  mt: isMobile ? 1.5 : 2,
                  minHeight: isMobile ? "6px" : "8px",
                  opacity: 0.7,
                  borderRadius: "4px",
                  alignSelf: "flex-start",
                  bgcolor:
                    index % 3 === 0
                      ? "#FFD700"
                      : index % 3 === 1
                      ? "#9370DB"
                      : "#4FC3F7",
                  ...getAnimationProps(index),
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageSection;
