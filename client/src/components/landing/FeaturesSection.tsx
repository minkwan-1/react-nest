import { Box, Typography, Container } from "@mui/material";
import { robot, humanImage, knowledge } from "../../images/index";
import { Feature } from "./index";

const FeaturesSection = () => {
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Typography
          fontWeight="bold"
          textAlign="center"
          sx={{
            mb: 10,
            fontSize: { xs: "2.2rem", md: "3rem" },
          }}
        >
          Pullim의 주요 기능
        </Typography>
        <Feature
          imageUrl={robot}
          title="AI의 즉각적인 답변"
          description="질문을 등록하는 순간, AI가 즉시 답변 초안을 생성해드립니다. 기다림 없이 문제 해결의 첫 걸음을 내딛으세요."
          imageSide="left"
        />
        <Feature
          imageUrl={humanImage}
          title="검증된 전문가의 깊이 있는 해결책"
          description="AI의 답변으로 부족했다면, 현직 개발자 및 분야별 전문가들이 직접 코드 리뷰와 함께 명쾌한 해결책을 제시합니다."
          imageSide="right"
        />
        <Feature
          imageUrl={knowledge}
          title="성장으로 이어지는 지식 아카이브"
          description="해결된 질문과 답변들은 누구나 쉽게 찾아볼 수 있는 지식의 보고가 됩니다. 다른 개발자들의 고민을 통해 함께 성장하세요."
          imageSide="left"
        />
      </Container>
    </Box>
  );
};

export default FeaturesSection;
