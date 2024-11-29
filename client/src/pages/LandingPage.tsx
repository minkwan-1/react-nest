import { Box, Typography } from "@mui/material";
import { PageContainer, ComponentWrapper } from "../components/layout/common";
import { DescriptionSection } from "../components/landing";

const LandingPage = () => {
  return (
    <PageContainer>
      <ComponentWrapper>
        {/* First Section */}
        <Box
          sx={{
            padding: "80px 20px",
            display: "flex",
            flexDirection: "column",
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

        {/* DescriptionSection 1 */}
        <DescriptionSection
          title="함께 성장하는 커뮤니티"
          description="RealCode_는 개발자들이 서로의 질문에 답변하고, 경험을 나누는 공간입니다."
        >
          <Typography variant="body1" color="text.secondary">
            지금 참여하여 더 많은 지식을 얻고, 다른 개발자와 소통해보세요!
          </Typography>
        </DescriptionSection>
        {/* DescriptionSection 2 */}
        <DescriptionSection
          title="성공적인 문제 해결 사례"
          description="RealCode_에서 수많은 개발자들이 자신의 문제를 해결했습니다."
        >
          <Typography variant="body1" color="text.secondary">
            사용자들의 성공 사례를 통해 여러분도 문제를 해결할 수 있습니다!
          </Typography>
        </DescriptionSection>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default LandingPage;
