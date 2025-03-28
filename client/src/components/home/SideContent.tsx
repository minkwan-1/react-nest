import { Box, Typography, Button, Chip, useTheme } from "@mui/material";
import { staffPicks, recommendedTopics } from "@mock/mockHomePageData";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { signupUserInfo } from "@atom/auth";

const SideContent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [userInfo] = useAtom(signupUserInfo);

  const handleClick = () => {
    if (!userInfo) {
      navigate("/sign-up");
    } else {
      console.log("edit으로");
    }
  };
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "none", md: "block" },
        flex: 1,
        pl: 3,
        position: "sticky",
        alignSelf: "flex-start",
        overflowY: "auto",
        height: "100%",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "4px",
        },
      }}
    >
      {/* 스태프 추천 섹션 */}
      <Box sx={{ mb: 5, paddingLeft: "20px" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2.5,
            ...theme.applyStyles("light", { color: "#212121" }), // 라이트 모드 색상
            ...theme.applyStyles("dark", { color: "#ffffff" }), // 다크 모드 색상
            fontSize: "18px",
            position: "relative",
            display: "inline-block",
            "&:after": {
              content: '""',
              position: "absolute",
              width: "40%",
              height: "3px",
              left: 0,
              bottom: "-8px",
              backgroundColor: "#03cb84",
              borderRadius: "10px",
            },
          }}
        >
          주간 인기 TOP 3
        </Typography>

        {staffPicks.map((pick) => (
          <Box
            key={pick.id}
            sx={{
              mb: 2,

              p: 2,
              borderRadius: 2,
              transition: "all 0.3s",
              ...theme.applyStyles("light", {
                backgroundColor: "#ffffff",
                border: "1px solid #E0E0E0",
              }), // 라이트 모드 배경
              ...theme.applyStyles("dark", {
                backgroundColor: "#333333",
                border: "none",
              }), // 다크 모드 배경
              "&:hover": {
                ...theme.applyStyles("light", { backgroundColor: "#F5F5F5" }),
                ...theme.applyStyles("dark", { backgroundColor: "#4F4F4F" }),
                cursor: "pointer",
              },
            }}
          >
            <Box
              sx={{
                gap: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "60px",
                  height: "60px",
                  borderRadius: 2,
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src={pick.thumbnail}
                  alt={pick.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      ...theme.applyStyles("light", { color: "#212121" }), // 라이트 모드 텍스트 색상
                      ...theme.applyStyles("dark", { color: "#F0FBF7" }), // 다크 모드 텍스트 색상
                    }}
                  >
                    {pick.author}
                  </Typography>
                </Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    mb: 0.5,
                    lineHeight: 1.3,
                    ...theme.applyStyles("light", { color: "#212121" }), // 라이트 모드 텍스트 색상
                    ...theme.applyStyles("dark", { color: "#F0FBF7" }), // 다크 모드 텍스트 색상
                  }}
                >
                  {pick.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    ...theme.applyStyles("light", { color: "#757575" }), // 라이트 모드 색상
                    ...theme.applyStyles("dark", { color: "#BDBDBD" }), // 다크 모드 색상
                  }}
                >
                  {pick.date}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* 추천 토픽 섹션 */}
      <Box sx={{ paddingLeft: "20px" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2.5,
            ...theme.applyStyles("light", { color: "#212121" }),
            ...theme.applyStyles("dark", { color: "#ffffff" }),
            fontSize: "18px",
            position: "relative",
            display: "inline-block",
            "&:after": {
              content: '""',
              position: "absolute",
              width: "40%",
              height: "3px",
              left: 0,
              bottom: "-8px",
              backgroundColor: "#03cb84",
              borderRadius: "10px",
            },
          }}
        >
          추천 토픽
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {recommendedTopics.map((topic, index) => (
            <Chip
              key={index}
              label={`${topic.name} (${topic.count})`}
              sx={{
                borderRadius: 8,
                bgcolor: "#F5F5F5", // 기본 라이트모드 배경
                color: "#757575", // 기본 라이트모드 텍스트 색상
                mb: 1.5,
                py: 2.5,
                border: "1px solid #EEEEEE",
                fontWeight: 500,
                transition: "all 0.2s",
                ...theme.applyStyles("light", {
                  backgroundColor: "#F5F5F5",
                  color: "#757575",
                  border: "1px solid #EEEEEE",
                }), // 라이트모드 스타일
                ...theme.applyStyles("dark", {
                  backgroundColor: "#4F4F4F", // 다크모드 배경
                  color: "#F0FBF7", // 다크모드 텍스트 색상
                  border: "1px solid #333333", // 다크모드 테두리
                }), // 다크모드 스타일
                "&:hover": {
                  ...theme.applyStyles("light", {
                    backgroundColor: "#E0E0E0", // 라이트모드 호버 배경
                  }),
                  ...theme.applyStyles("dark", {
                    backgroundColor: "#616161", // 다크모드 호버 배경
                  }),
                  border: "1px solid #03cb84",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
                  color: "#03cb84", // 호버 시 글자 색상
                },
              }}
              clickable
            />
          ))}
        </Box>
      </Box>

      {/* 새로운 섹션: 질문하기 */}
      <Box
        sx={{
          mt: 5,
          paddingLeft: "20px",
          py: 3,
          px: 3,
          borderRadius: 3,
          border: "1px dashed #03cb84",
          ...theme.applyStyles("light", {
            backgroundColor: "#F0FBF7", // 라이트 모드 배경
          }),
          ...theme.applyStyles("dark", {
            backgroundColor: "#333333", // 다크 모드 배경
          }),
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 1.5,
            color: "#03cb84",
            ...theme.applyStyles("light", { color: "#03cb84" }),
            ...theme.applyStyles("dark", { color: "#80e0b0" }), // 다크 모드에서 색상 변경
          }}
        >
          궁금한 내용이 있으신가요?
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            ...theme.applyStyles("light", { color: "#616161" }), // 라이트 모드 텍스트 색상
            ...theme.applyStyles("dark", { color: "#E0E0E0" }), // 다크 모드 텍스트 색상
          }}
        >
          개발자 커뮤니티에 질문을 남겨보세요. 다양한 전문가들의 답변을 받을 수
          있습니다.
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#03cb84",
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: 2,
            boxShadow: "0 2px 5px rgba(3,203,132,0.3)",
            py: 1,
            transition: "all 0.3s",
            ...theme.applyStyles("light", { bgcolor: "#03cb84" }),
            ...theme.applyStyles("dark", { bgcolor: "#02a770" }), // 다크 모드 배경색
            "&:hover": {
              bgcolor: "#02a770",
              boxShadow: "0 4px 10px rgba(3,203,132,0.4)",
              transform: "translateY(-1px)",
            },
          }}
          onClick={() => handleClick()}
        >
          질문하기
        </Button>
      </Box>

      {/* 인기 태그 섹션 */}
      <Box sx={{ mt: 5, paddingLeft: "20px" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2.5,
            ...theme.applyStyles("light", { color: "#212121" }),
            ...theme.applyStyles("dark", { color: "#ffffff" }),
            fontSize: "18px",
            position: "relative",
            display: "inline-block",
            "&:after": {
              content: '""',
              position: "absolute",
              width: "40%",
              height: "3px",
              left: 0,
              bottom: "-8px",
              backgroundColor: "#03cb84",
              borderRadius: "10px",
            },
          }}
        >
          인기 태그
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {[
            "JavaScript",
            "React",
            "TypeScript",
            "NextJS",
            "CSS",
            "Node.js",
            "API",
            "Frontend",
          ].map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              sx={{
                borderRadius: 4,
                bgcolor: "transparent",
                color: "#757575",
                mb: 1,
                border: "1px solid #E0E0E0",
                "&:hover": {
                  "&:hover": {
                    ...theme.applyStyles("light", {
                      backgroundColor: "#F5F5F5",
                    }),
                    ...theme.applyStyles("dark", {
                      backgroundColor: "#4F4F4F",
                    }),
                  },
                  color: "#03cb84",
                  border: "1px solid #03cb84",
                },
              }}
              clickable
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SideContent;
