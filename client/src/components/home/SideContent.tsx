import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Button,
  Chip,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useQuery } from "@tanstack/react-query";
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
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
};

const SideContent = () => {
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

  const handleReadMore = (link: string) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Box
      sx={{
        flex: 1.5,
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        minHeight: 0,
      }}
    >
      <Typography
        sx={{
          fontSize: "28px",
          fontWeight: "bold",
          paddingLeft: 1,
          flexShrink: 0,
        }}
      >
        주요 IT 뉴스
      </Typography>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "transparent",
            borderRadius: "3px",
          },
          "&:hover": {
            "&::-webkit-scrollbar-thumb": {
              background: "#c1c1c1",
              "&:hover": {
                background: "#a8a8a8",
              },
            },
          },
        }}
      >
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Typography color="error" sx={{ mt: 2, px: 1 }}>
            뉴스 데이터를 불러오는 중 오류가 발생했습니다.
          </Typography>
        )}

        {!isLoading &&
          !isError &&
          data?.map((news, index) => (
            <Card
              key={index}
              sx={{
                display: "flex",
                flexDirection: "row",
                borderRadius: 3,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                  transform: "translateY(-2px)",
                },
                overflow: "hidden",
                minHeight: "120px",
              }}
            >
              {news.image && (
                <CardMedia
                  component="img"
                  sx={{
                    width: 140,
                    flexShrink: 0,
                    objectFit: "cover",
                  }}
                  image={news.image}
                  alt={news.title}
                />
              )}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  p: 2,
                  minWidth: 0,
                }}
              >
                <CardContent
                  sx={{
                    flex: "1 0 auto",
                    p: "0 !important",
                    mb: 1,
                    minWidth: 0,
                  }}
                >
                  <Typography
                    component="div"
                    variant="h6"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      lineHeight: 1.4,
                      mb: 0.5,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      wordBreak: "break-word",
                    }}
                    title={news.title}
                  >
                    {news.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      lineHeight: 1.4,
                      wordBreak: "break-word",
                    }}
                    title={news.summary}
                  >
                    {news.summary}
                  </Typography>
                </CardContent>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: "auto",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    {news.source && (
                      <Chip
                        label={news.source}
                        size="small"
                        variant="outlined"
                        sx={{
                          flexShrink: 0,
                          fontSize: "0.75rem",
                        }}
                      />
                    )}
                    <Typography
                      variant="caption"
                      color="text.disabled"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatDate(news.pubDate)}
                    </Typography>
                  </Box>

                  <Button
                    size="small"
                    variant="outlined"
                    endIcon={<OpenInNewIcon fontSize="small" />}
                    onClick={() => handleReadMore(news.originallink)}
                    sx={{
                      flexShrink: 0,
                      fontSize: "0.75rem",
                      px: 1.5,
                      py: 0.5,
                      borderColor: "#b8dae1",
                      color: "#b8dae1",
                      "&:hover": {
                        backgroundColor: "#b8dae1",
                        color: "#fff",
                        borderColor: "#b8dae1",
                      },
                    }}
                  >
                    더보기
                  </Button>
                </Box>
              </Box>
            </Card>
          ))}
      </Box>
    </Box>
  );
};

export default SideContent;
