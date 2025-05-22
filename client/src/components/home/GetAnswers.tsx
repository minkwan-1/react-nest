import { Box, Typography, Button, useTheme } from "@mui/material";

interface GetAnswersProps {
  handleClick: () => void;
}

const GetAnswers = ({ handleClick }: GetAnswersProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        mt: 5,
        py: 3,
        px: 3,
        borderRadius: 6,
        border: "1px dashed #c5a3d5",
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
          color: "#c5a3d5",
          ...theme.applyStyles("light", { color: "#c5a3d5" }),
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
          bgcolor: "#c5a3d5",
          textTransform: "none",
          fontWeight: "bold",
          borderRadius: 2,
          boxShadow: "0 2px 5px rgba(3,203,132,0.3)",
          py: 1,
          transition: "all 0.3s",
          ...theme.applyStyles("light", { bgcolor: "#c5a3d5" }),
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
  );
};

export default GetAnswers;
