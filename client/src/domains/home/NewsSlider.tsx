import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Chip,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSwipeable } from "react-swipeable";

interface NewsItem {
  title: string;
  summary: string;
  image?: string;
  originallink: string;
  source?: string;
  pubDate?: string;
}

interface NewsApiResponse {
  title: string;
  summary: string;
  image?: string;
  originallink: string;
  source?: string;
  pubDate?: string;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
};

const NewsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data, isLoading, isError } = useQuery<NewsItem[]>({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await axios.get<NewsApiResponse[]>(
        "http://localhost:3000/news"
      );
      return res.data.map((item) => ({
        ...item,
        source: item.source || "IT 뉴스",
        pubDate: item.pubDate || new Date().toISOString(),
      }));
    },
  });

  useEffect(() => {
    if (!isPlaying || !data || data.length <= 1 || isHovered) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, data, isHovered]);

  const goNext = () => {
    if (!data) return;
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const goPrev = () => {
    if (!data) return;
    setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const handleTitleClick = (link: string) => {
    if (link) window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleDotClick = (index: number) => setCurrentIndex(index);
  const handleTitleMouseEnter = () => setIsHovered(true);
  const handleTitleMouseLeave = () => setIsHovered(false);

  const pauseAndResume = () => {
    setIsHovered(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsHovered(false), 1500);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      goNext();
      pauseAndResume();
    },
    onSwipedRight: () => {
      goPrev();
      pauseAndResume();
    },
    onSwiping: () => setIsHovered(true),
    onSwiped: () => pauseAndResume(),
    trackMouse: true,
    touchEventOptions: { passive: false },
  });

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data || data.length === 0) {
    return (
      <Typography color="error" sx={{ py: 2, textAlign: "center" }}>
        뉴스 데이터를 불러오는 중 오류가 발생했습니다.
      </Typography>
    );
  }

  const currentNews = data[currentIndex];

  return (
    <Box
      {...swipeHandlers}
      sx={{
        position: "relative",
        mb: 3,
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        touchAction: "pan-y",
        userSelect: "none",
      }}
    >
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
        {currentNews.image && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${currentNews.image})`,
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
            {currentNews.source && (
              <Chip
                label={currentNews.source}
                size="small"
                variant="outlined"
                sx={{ borderColor: "rgba(255,255,255,0.5)", color: "white" }}
              />
            )}
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.8)" }}
            >
              {formatDate(currentNews.pubDate)}
            </Typography>
          </Box>

          <Typography
            variant="h5"
            onClick={() => handleTitleClick(currentNews.originallink)}
            onMouseEnter={handleTitleMouseEnter}
            onMouseLeave={handleTitleMouseLeave}
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
            {currentNews.title}
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
            {currentNews.summary}
          </Typography>
        </CardContent>
      </Card>

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
        {data.slice(0, 10).map((_, index) => (
          <Box
            key={index}
            onClick={() => handleDotClick(index)}
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
    </Box>
  );
};

export default NewsSlider;
