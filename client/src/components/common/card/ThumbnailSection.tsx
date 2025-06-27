import { Box } from "@mui/material";

interface ThumbnailSectionProps {
  thumbnail?: string;
  content: string;
  title: string;
}

const extractImageFromContent = (htmlContent: string): string | null => {
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
  const match = htmlContent.match(imgRegex);
  return match ? match[1] : null;
};

const ThumbnailSection = ({
  thumbnail,
  content,
  title,
}: ThumbnailSectionProps) => {
  const thumbnailSrc = thumbnail || extractImageFromContent(content);

  if (!thumbnailSrc) return null;

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
          alt={title}
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
