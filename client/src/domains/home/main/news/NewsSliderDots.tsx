import { Box } from "@mui/material";

interface NewsSliderDotsProps {
  count: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
}

const NewsSliderDots = ({
  count,
  currentIndex,
  onDotClick,
}: NewsSliderDotsProps) => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 1,
        zIndex: 4,
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Box
          key={index}
          onClick={() => onDotClick(index)}
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor:
              index === currentIndex ? "white" : "rgba(255,255,255,0.4)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.8)" },
          }}
        />
      ))}
    </Box>
  );
};

export default NewsSliderDots;
