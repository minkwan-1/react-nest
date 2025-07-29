import { Typography } from "@mui/material";

const ContentInstruction = () => {
  return (
    <Typography
      variant="body2"
      sx={{
        mb: 2,
        fontSize: "14px",
      }}
    >
      문제 상황, 시도한 방법, 예상 결과 등을 상세히 설명해주세요
    </Typography>
  );
};

export default ContentInstruction;
