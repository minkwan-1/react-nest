import { Box } from "@mui/material";

interface ThumbnailSectionProps {
  thumbnailSrc: string;
}

const ThumbnailSection = ({ thumbnailSrc }: ThumbnailSectionProps) => {
  return (
    <Box
      sx={{
        flexShrink: 0,
        display: { xs: "none", sm: "block" },
      }}
    >
      <Box
        sx={{
          width: "140px",
          height: "100px",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src={thumbnailSrc}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.6s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </Box>
    </Box>
  );
};

export default ThumbnailSection;
