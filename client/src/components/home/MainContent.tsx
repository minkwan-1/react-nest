import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  IconButton,
  useTheme,
} from "@mui/material";
import { InputAdornment } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Badge } from "@mui/material";
import { questionData } from "@mock/mockHomePageData";
import SearchIcon from "@mui/icons-material/Search";

const MainContent = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        flex: 2,
        pr: { xs: "0", sm: "0", md: "3" },
        overflowY: "auto",
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
          ...theme.applyStyles("light", { color: "#212121" }),
          ...theme.applyStyles("dark", { color: "#ffffff" }),
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
            // 라이트모드와 다크모드 스타일 적용
            ...theme.applyStyles("light", { color: "#212121" }), // 라이트모드 스타일
            ...theme.applyStyles("light", { color: "#ffffff" }), // 다크모드 스타일
            flexGrow: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor:
                theme.palette.mode === "dark" ? "#333333" : "#FFFFFF", // 다크모드일 때 배경 색상
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
            "& .MuiInputBase-input::placeholder": {
              color: theme.palette.mode === "dark" ? "#ffffff" : "#757575",
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
        <IconButton disableRipple>
          <SearchIcon
            sx={{
              ...theme.applyStyles("light", { color: "#03cb84" }),
              ...theme.applyStyles("dark", { color: "#ffffff" }),
            }}
          />
        </IconButton>
      </Box>

      {/* 필터 버튼들 - 고정 크기 및 가로 스크롤 적용 */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 4,
          overflowX: "auto",
          pb: 1,
          flexWrap: "nowrap", // 버튼이 줄바꿈되지 않도록 설정
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
            ...theme.applyStyles("light", { backgroundColor: "#F0FBF7" }),
            ...theme.applyStyles("dark", { backgroundColor: "#333333" }),
            border: "1px solid #E0E0E0",
            borderRadius: 6,
            textTransform: "none",
            px: 2,
            py: 0.8,
            fontWeight: 500,
            minWidth: "85px", // 버튼 최소 너비 고정
            flexShrink: 0, // 버튼 크기 축소 방지
            "&:hover": {
              ...theme.applyStyles("light", { backgroundColor: "#F5F5F5" }),
              ...theme.applyStyles("dark", { backgroundColor: "#4F4F4F" }),
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
            ...theme.applyStyles("light", { backgroundColor: "#F0FBF7" }),
            ...theme.applyStyles("dark", { backgroundColor: "#333333" }),
            fontWeight: 500,
            minWidth: "85px", // 버튼 최소 너비 고정
            flexShrink: 0, // 버튼 크기 축소 방지
            "&:hover": {
              ...theme.applyStyles("light", { backgroundColor: "#F5F5F5" }),
              ...theme.applyStyles("dark", { backgroundColor: "#4F4F4F" }),
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
            ...theme.applyStyles("light", { backgroundColor: "#F0FBF7" }),
            ...theme.applyStyles("dark", { backgroundColor: "#333333" }),
            fontWeight: 500,
            minWidth: "85px", // 버튼 최소 너비 고정
            flexShrink: 0, // 버튼 크기 축소 방지
            "&:hover": {
              ...theme.applyStyles("light", { backgroundColor: "#F5F5F5" }),
              ...theme.applyStyles("dark", { backgroundColor: "#4F4F4F" }),
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
            ...theme.applyStyles("light", { backgroundColor: "#F0FBF7" }),
            ...theme.applyStyles("dark", { backgroundColor: "#333333" }),
            fontWeight: 500,
            minWidth: "85px", // 버튼 최소 너비 고정
            flexShrink: 0, // 버튼 크기 축소 방지
            "&:hover": {
              ...theme.applyStyles("light", { backgroundColor: "#F5F5F5" }),
              ...theme.applyStyles("dark", { backgroundColor: "#4F4F4F" }),
            },
          }}
          startIcon={<TrendingUpIcon sx={{ fontSize: 18 }} />}
        >
          인기순
        </Button>
      </Box>

      {/* 질문 카드들 */}
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
              ...theme.applyStyles("light", { backgroundColor: "#F5F5F5" }),
              ...theme.applyStyles("dark", { backgroundColor: "#4F4F4F" }),
            },
            overflow: "visible",

            ...theme.applyStyles("light", {
              backgroundColor: "#ffffff", // 라이트 모드 배경 색상
              border: "1px solid #F0F0F0",
            }),
            ...theme.applyStyles("dark", {
              backgroundColor: "#333333", // 다크 모드 배경 색상
              border: "none",
            }),
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
                  ...theme.applyStyles("light", { color: "#333333" }), // 라이트 모드 글자 색상
                  ...theme.applyStyles("dark", { color: "#F0FBF7" }), // 다크 모드 글자 색상
                }}
              >
                {question.author}
              </Typography>
              <Typography variant="body2" sx={{ mx: 1, color: "#BDBDBD" }}>
                •
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  ...theme.applyStyles("light", { color: "#333333" }),
                  ...theme.applyStyles("dark", { color: "#F0FBF7" }),
                }}
              >
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
                    ...theme.applyStyles("light", { color: "#333333" }),
                    ...theme.applyStyles("dark", { color: "#F0FBF7" }),
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
                    ...theme.applyStyles("dark", { color: "#F0FBF7" }), // 다크모드 텍스트 색상
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

              {/* 썸네일 이미지 영역 - 600px 이하에서 숨김 처리 */}
              <Box
                sx={{
                  flexShrink: 0,
                  display: { xs: "none", sm: "block" }, // 600px 이하에서 숨김 (xs 사이즈에서 none)
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
