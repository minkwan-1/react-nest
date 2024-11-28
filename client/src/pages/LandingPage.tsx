import { Box, Typography } from "@mui/material";
import { PageContainer, ComponentWrapper } from "../components/layout/common";

const keywords = [
  "프론트엔드",
  "백엔드",
  "데이터베이스",
  "API",
  "디자인 패턴",
  "테스트",
  "DevOps",
  "클라우드 컴퓨팅",
  "모바일 개발",
  "웹 접근성",
  "성능 최적화",
  "소프트웨어 아키텍처",
  "버전 관리",
  "프레임워크",
  "라이브러리",
  "인공지능",
];

const LandingPage = () => {
  return (
    <PageContainer>
      <ComponentWrapper>
        {/* 첫 번째 섹션 */}
        <Box
          sx={{
            padding: "80px 20px",
            display: "flex",
            flexDirection: "column",
            // borderBottom: (theme) => {
            //   return {
            //     ...theme.applyStyles("light", {
            //       borderBottom: "1px solid red",
            //     }),
            //     ...theme.applyStyles("dark", {
            //       borderBottom: "1px solid #30363d",
            //     }),
            //   };
            // },
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Typography
            sx={{ fontSize: "40px", fontWeight: "bold" }}
            gutterBottom
          >
            문제를 해결하는 곳, RealCode_
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            최고의 개발자들과 지식을 나누고, 서로의 문제를 해결해보세요.
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            다양한 개발 주제로 커뮤니티에 참여하고, 경험을 공유하세요.
          </Typography>
        </Box>

        {/* 키워드 섹션 */}
        <Box
          className="keywords"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: 2,
            padding: "40px 20px",
          }}
        >
          {keywords.map((keyword) => (
            <Box
              key={keyword}
              sx={{
                width: "100%",
                aspectRatio: "1 / 1",
                border: "1px solid #ccc",
                borderRadius: "8px",
                // bgcolor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                "&:hover": {
                  border: "1px solid white",
                },
              }}
            >
              <Typography variant="body2">{keyword}</Typography>
            </Box>
          ))}
        </Box>

        {/* 추가 설명 섹션 */}
        <Box
          sx={{
            padding: "60px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            RealCode_에서 당신의 지식을 나누세요!
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            우리의 목표는 모든 개발자들이 서로의 지식과 경험을 통해 성장하는
            것입니다.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            지금 바로 질문을 올리고, 다른 개발자들과 소통해보세요!
          </Typography>
        </Box>

        {/* 커뮤니티 참여 섹션 */}
        <Box
          sx={{
            padding: "60px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            함께 성장하는 커뮤니티
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            RealCode_는 개발자들이 서로의 질문에 답변하고, 경험을 나누는
            공간입니다.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            지금 참여하여 더 많은 지식을 얻고, 다른 개발자와 소통해보세요!
          </Typography>
        </Box>

        {/* 성공 사례 섹션 */}
        <Box
          sx={{
            padding: "60px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            성공적인 문제 해결 사례
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            RealCode_에서 수많은 개발자들이 자신의 문제를 해결했습니다.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            사용자들의 성공 사례를 통해 여러분도 문제를 해결할 수 있습니다!
          </Typography>
        </Box>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default LandingPage;
