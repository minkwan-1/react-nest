import { Box, Card, CardContent, Typography, Chip } from "@mui/material";

interface NewsItem {
  title: string;
  summary: string;
  image?: string;
  originallink: string;
  source?: string;
  pubDate?: string;
}

interface NewsSlideProps {
  newsItem: NewsItem;
  onTitleClick: (link: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
};

const NewsSlide = ({
  newsItem,
  onTitleClick,
  onMouseEnter,
  onMouseLeave,
}: NewsSlideProps) => {
  return (
    <Card
      sx={{
        position: "relative",
        display: "flex",
        minHeight: "200px",
        background:
          "linear-gradient(135deg, #c8e6ef 0%, #b8dae1 50%, #a8cdd8 100%)",
        color: "white",
      }}
    >
      {newsItem.image && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${newsItem.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3,
            zIndex: 1,
          }}
        />
      )}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(45deg, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
          zIndex: 2,
        }}
      />

      <CardContent
        sx={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          p: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Chip
            label="HOT NEWS"
            size="small"
            sx={{
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: "bold",
            }}
          />
          {newsItem.source && (
            <Chip
              label={newsItem.source}
              size="small"
              variant="outlined"
              sx={{ borderColor: "rgba(255,255,255,0.5)", color: "white" }}
            />
          )}
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.8)" }}>
            {formatDate(newsItem.pubDate)}
          </Typography>
        </Box>

        <Typography
          variant="h5"
          onClick={() => onTitleClick(newsItem.originallink)}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          sx={{
            fontWeight: "bold",
            mb: 1.5,
            lineHeight: 1.3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              opacity: 0.8,
              textDecoration: "underline",
              transform: "translateX(4px)",
            },
          }}
        >
          {newsItem.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 2,
            opacity: 0.9,
            lineHeight: 1.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {newsItem.summary}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NewsSlide;
