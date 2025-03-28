import { Box, Typography, Button, Chip } from "@mui/material";
import { staffPicks, recommendedTopics } from "@mock/mockHomePageData";

const SideContent = () => {
  return (
    <Box
      sx={{
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
            color: "#212121",
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
              border: "1px solid #E0E0E0",
              p: 2,
              borderRadius: 2,
              transition: "all 0.3s",
              "&:hover": {
                backgroundColor: "#F5F5F5",
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
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {pick.author}
                  </Typography>
                </Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    mb: 0.5,
                    lineHeight: 1.3,
                    color: "#212121",
                  }}
                >
                  {pick.title}
                </Typography>
                <Typography variant="caption" sx={{ color: "#757575" }}>
                  {pick.date}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
        <Button
          sx={{
            textTransform: "none",
            color: "#757575",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#F5F5F5",
              color: "#03cb84",
            },
          }}
        >
          더 보기
        </Button>
      </Box>

      {/* 추천 토픽 섹션 */}
      <Box sx={{ paddingLeft: "20px" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2.5,
            color: "#212121",
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
                bgcolor: "#F5F5F5",
                color: "#424242",
                mb: 1.5,
                py: 2.5,
                border: "1px solid #EEEEEE",
                fontWeight: 500,
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "#E8F7F2",
                  border: "1px solid #03cb84",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
                  color: "#03cb84",
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
          backgroundColor: "#F0FBF7",
          py: 3,
          px: 3,
          borderRadius: 3,
          border: "1px dashed #03cb84",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 1.5,
            color: "#03cb84",
          }}
        >
          궁금한 내용이 있으신가요?
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: "#616161" }}>
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
            "&:hover": {
              bgcolor: "#02a770",
              boxShadow: "0 4px 10px rgba(3,203,132,0.4)",
              transform: "translateY(-1px)",
            },
          }}
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
            color: "#212121",
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
                  bgcolor: "#FAFAFA",
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
