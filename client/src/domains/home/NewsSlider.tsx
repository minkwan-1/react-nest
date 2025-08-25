import { Box, CircularProgress, Typography } from "@mui/material";
import { NewsSliderDots, NewsSlide } from "./main/news/index";
import useNewsSlider from "./main/news/hooks/useNewsSlider";

const NewsSlider = () => {
  const {
    currentIndex,
    data,
    isLoading,
    isError,
    currentNews,
    handleTitleClick,
    handleDotClick,
    handleTitleMouseEnter,
    handleTitleMouseLeave,
    swipeHandlers,
  } = useNewsSlider();

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
      <NewsSlide
        newsItem={currentNews!}
        onTitleClick={handleTitleClick}
        onMouseEnter={handleTitleMouseEnter}
        onMouseLeave={handleTitleMouseLeave}
      />

      <NewsSliderDots
        count={Math.min(data.length, 10)}
        currentIndex={currentIndex}
        onDotClick={handleDotClick}
      />
    </Box>
  );
};

export default NewsSlider;
