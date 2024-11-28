import { Box, Typography } from "@mui/material";

const DescriptionSection = () => {
  return (
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
        RealCode_는 개발자들이 서로의 질문에 답변하고, 경험을 나누는 공간입니다.
      </Typography>
      <Typography variant="body1" color="text.secondary">
        지금 참여하여 더 많은 지식을 얻고, 다른 개발자와 소통해보세요!
      </Typography>
    </Box>
  );
};

export default DescriptionSection;
