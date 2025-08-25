import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSwipeable } from "react-swipeable";
import axios from "axios";

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

const useNewsSlider = () => {
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

  return {
    currentIndex,
    isHovered,

    data,
    isLoading,
    isError,
    currentNews: data ? data[currentIndex] : null,

    goNext,
    goPrev,
    handleTitleClick,
    handleDotClick,
    handleTitleMouseEnter,
    handleTitleMouseLeave,
    swipeHandlers,
  };
};

export default useNewsSlider;
