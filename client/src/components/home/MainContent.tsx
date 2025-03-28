import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  IconButton,
} from "@mui/material";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Badge } from "@mui/material";
import { questionData } from "@mock/mockHomePageData";

const MainContent = () => {
  return (
    <Box
      sx={{
        flex: 2,
        pr: 4,
        overflowY: "auto", // Y축 스크롤만 가능하도록
        height: "100%",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#F1F1F1",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#BDBDBD",
          borderRadius: "10px",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: 3,
          color: "#212121",
          fontFamily: "'Noto Sans KR', sans-serif",
        }}
      >
        질문 및 답변
      </Typography>

      {/* 검색바 - 스타일 개선 */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 4 }}>
        <TextField
          variant="outlined"
          placeholder="원하는 주제를 찾아보세요"
          fullWidth
          sx={{
            flexGrow: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "#FFFFFF",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              transition: "all 0.3s",
              "&:hover": {
                boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
              },
              "&.Mui-focused": {
                boxShadow: "0 3px 8px rgba(3,203,132,0.25)",
              },
              "&:hover fieldset": {
                borderColor: "#03cb84",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#03cb84",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#757575" }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          sx={{
            bgcolor: "#03cb84",
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: 2,
            boxShadow: "0 2px 5px rgba(3,203,132,0.3)",
            transition: "all 0.3s",
            "&:hover": {
              bgcolor: "#02a770",
              boxShadow: "0 4px 10px rgba(3,203,132,0.4)",
              transform: "translateY(-1px)",
            },
          }}
        >
          검색
        </Button>
      </Box>

      {/* 필터 버튼들 - 더 세련된 디자인 */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 4,
          overflowX: "auto",
          pb: 1,
          "&::-webkit-scrollbar": {
            height: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#F5F5F5",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#BDBDBD",
            borderRadius: "10px",
          },
        }}
      >
        <Button
          sx={{
            color: "#03cb84",
            border: "1px solid #E0E0E0",
            borderRadius: 6,
            textTransform: "none",
            px: 2,
            py: 0.8,
            backgroundColor: "#F0FBF7",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#E1F7F0",
              borderColor: "#03cb84",
            },
          }}
          startIcon={<AccessTimeIcon sx={{ fontSize: 18 }} />}
        >
          최신순
        </Button>
        <Button
          sx={{
            color: "#616161",
            border: "1px solid #E0E0E0",
            borderRadius: 6,
            textTransform: "none",
            px: 2,
            py: 0.8,
            backgroundColor: "#FFFFFF",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#F5F5F5",
            },
          }}
          startIcon={<ThumbUpOutlinedIcon sx={{ fontSize: 18 }} />}
        >
          추천순
        </Button>
        <Button
          sx={{
            color: "#616161",
            border: "1px solid #E0E0E0",
            borderRadius: 6,
            textTransform: "none",
            px: 2,
            py: 0.8,
            backgroundColor: "#FFFFFF",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#F5F5F5",
            },
          }}
          startIcon={<CommentOutlinedIcon sx={{ fontSize: 18 }} />}
        >
          답변순
        </Button>
        <Button
          sx={{
            color: "#616161",
            border: "1px solid #E0E0E0",
            borderRadius: 6,
            textTransform: "none",
            px: 2,
            py: 0.8,
            backgroundColor: "#FFFFFF",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#F5F5F5",
            },
          }}
          startIcon={<TrendingUpIcon sx={{ fontSize: 18 }} />}
        >
          인기순
        </Button>
      </Box>

      {/* 질문 카드들 - 더 세련된 디자인 */}
      {questionData.map((question) => (
        <Card
          key={question.id}
          sx={{
            mb: 3,
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            transition: "all 0.3s",
            "&:hover": {
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              transform: "translateY(-2px)",
            },
            overflow: "visible",
            border: "1px solid #F0F0F0",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  mr: 1,
                  bgcolor: "#03cb84",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {question.author.charAt(0)}
              </Avatar>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: "#424242",
                }}
              >
                {question.author}
              </Typography>
              <Typography variant="body2" sx={{ mx: 1, color: "#BDBDBD" }}>
                •
              </Typography>
              <Typography variant="body2" sx={{ color: "#757575" }}>
                {question.date}
              </Typography>
            </Box>

            {/* 컨텐츠와 썸네일을 flex로 배치 */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 3,
              }}
            >
              {/* 컨텐츠 영역 - 너비 조정 */}
              <Box sx={{ flex: "1" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: 1.5,
                    color: "#212121",
                    fontFamily: "'Noto Serif KR', serif",
                    fontSize: "18px",
                    lineHeight: 1.4,
                  }}
                >
                  {question.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#616161",
                    marginBottom: 2.5,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: 1.5,
                  }}
                >
                  {question.content}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    size="small"
                    sx={{
                      color: "#03cb84",
                      fontWeight: 500,
                      textTransform: "none",
                      "&:hover": {
                        color: "#02a770",
                        backgroundColor: "rgba(3, 203, 132, 0.05)",
                      },
                      pl: 0,
                      borderRadius: 6,
                    }}
                    startIcon={<CommentOutlinedIcon sx={{ fontSize: 18 }} />}
                  >
                    답변하기
                  </Button>
                  <Badge
                    // badgeContent={question.answers}
                    color="primary"
                    sx={{
                      mx: 1,
                      "& .MuiBadge-badge": {
                        backgroundColor: "#03cb84",
                        fontWeight: "bold",
                      },
                    }}
                  >
                    <Box sx={{ width: 16 }} />
                  </Badge>
                  <Box sx={{ flexGrow: 1 }} />
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      size="small"
                      aria-label="좋아요"
                      sx={{ color: "#757575" }}
                    >
                      <ThumbUpOutlinedIcon fontSize="small" />
                    </IconButton>
                    <Typography
                      variant="body2"
                      sx={{ color: "#757575", mr: 2 }}
                    >
                      {question.likes}
                    </Typography>
                    <IconButton
                      size="small"
                      aria-label="저장"
                      sx={{ color: "#757575" }}
                    >
                      <BookmarkBorderIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>

              {/* 썸네일 이미지 영역 - 더 세련된 스타일 */}
              <Box sx={{ flexShrink: 0 }}>
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
                    src={question.thumbnail}
                    alt={question.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MainContent;
