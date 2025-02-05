import { Box, Typography, Button, Card, CardActions } from "@mui/material";
import { PageContainer, ComponentWrapper } from "../components/layout/common";

const tagData = [
  { id: 1, tag: "React", questions: 15 },
  { id: 2, tag: "JavaScript", questions: 20 },
  { id: 3, tag: "CSS", questions: 10 },
  { id: 4, tag: "HTML", questions: 25 },
  { id: 5, tag: "TypeScript", questions: 30 },
  { id: 6, tag: "Node.js", questions: 5 },
  { id: 7, tag: "Python", questions: 12 },
  { id: 8, tag: "Web Development", questions: 18 },
  { id: 9, tag: "Design", questions: 8 },
  { id: 10, tag: "Git", questions: 13 },
  { id: 11, tag: "API", questions: 22 },
  { id: 12, tag: "React Query", questions: 9 },
  { id: 13, tag: "Database", questions: 7 },
  { id: 14, tag: "Redux", questions: 16 },
  { id: 15, tag: "Vue.js", questions: 6 },
  { id: 16, tag: "DevOps", questions: 14 },
  { id: 17, tag: "Security", questions: 11 },
  { id: 18, tag: "Testing", questions: 21 },
  { id: 19, tag: "Java", questions: 17 },
  { id: 20, tag: "UX/UI", questions: 19 },
  { id: 21, tag: "Network", questions: 7 },
];

const TagPage = () => {
  return (
    <PageContainer>
      <ComponentWrapper sx={{ padding: 2 }}>
        <Typography
          sx={{
            color: (theme) => {
              return {
                ...theme.applyStyles("light", {
                  color: "black",
                }),
                ...theme.applyStyles("dark", {
                  color: "white",
                }),
              };
            },
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: 2,
          }}
        >
          태그
        </Typography>

        {/* 태그 카드들 */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between", // 여백을 고르게 배치
            gap: 2,
          }}
        >
          {tagData.map((tag) => (
            <Card
              key={tag.id}
              sx={{
                flexBasis: "calc(33.33% - 16px)", // 한 줄에 3개씩 배치
                flexGrow: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                marginBottom: 3,
                textAlign: "center",
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              {/* 태그 키워드 박스 */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  padding: "10px",
                  border: "2px solid #03cb84",
                  borderRadius: 4,
                  marginBottom: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#03cb84",
                  }}
                >
                  {tag.tag}
                </Typography>
              </Box>
              {/* 질문 수 */}
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  fontSize: "14px",
                  marginTop: 1,
                  marginBottom: 1,
                }}
              >
                {tag.questions}+ 질문
              </Typography>
              {/* 버튼 */}
              <CardActions sx={{ justifyContent: "center", padding: 0 }}>
                <Button size="small" sx={{ color: "#03cb84" }}>
                  태그 보기
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default TagPage;
