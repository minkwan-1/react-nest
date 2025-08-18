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

// 뉴스 데이터 타입
interface NewsItem {
  title: string;
  summary: string;
  image?: string;
  originallink: string;
  source?: string;
  pubDate?: string;
}

// API 응답 타입
interface NewsApiResponse {
  title: string;
  summary: string;
  image?: string;
  originallink: string;
  source?: string;
  pubDate?: string;
}

// 날짜 포맷팅 함수
const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
};

const NewsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { data, isLoading, isError } = useQuery<NewsItem[]>({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await axios.get<NewsApiResponse[]>(
        "http://localhost:3000/news"
      );
      return res.data.map((item: NewsApiResponse) => ({
        ...item,
        source: item.source || "IT 뉴스",
        pubDate: item.pubDate || new Date().toISOString(),
      }));
    },
  });

  // 자동 슬라이딩 (호버 상태가 아닐 때만)
  useEffect(() => {
    if (!isPlaying || !data || data.length <= 1 || isHovered) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 3000); // 4초마다 슬라이드

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, data, isHovered]);

  const handleTitleClick = (link: string) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTitleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleTitleMouseLeave = () => {
    setIsHovered(false);
  };

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
      sx={{
        position: "relative",
        mb: 3,
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      {/* 메인 슬라이더 */}
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
        {/* 배경 이미지 */}
        {currentNews.image && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${currentNews.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.3,
              zIndex: 1,
            }}
          />
        )}

        {/* 그라데이션 오버레이 */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(45deg, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
            zIndex: 2,
          }}
        />

        {/* 컨텐츠 */}
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
          {/* 뉴스 라벨 */}
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
                sx={{
                  borderColor: "rgba(255,255,255,0.5)",
                  color: "white",
                }}
              />
            )}
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.8)" }}
            >
              {formatDate(currentNews.pubDate)}
            </Typography>
          </Box>

          {/* 제목 - 클릭 가능하고 호버 시 슬라이딩 멈춤 */}
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

          {/* 요약 */}
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

      {/* 인디케이터 도트 */}
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
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.8)",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default NewsSlider;
