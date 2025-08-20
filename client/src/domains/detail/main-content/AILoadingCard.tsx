import { Card, CardContent, CircularProgress, Typography } from "@mui/material";

const AILoadingCard = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 4,

        borderRadius: 3,

        animation: "pulse 2s infinite",
        "@keyframes pulse": {
          "0%": { opacity: 1 },
          "50%": { opacity: 0.8 },
          "100%": { opacity: 1 },
        },
      }}
    >
      <CardContent sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress size={32} sx={{ color: "#b8dae1" }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          🤖 AI가 답변을 생성하고 있습니다...
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "14px",
          }}
        >
          질문을 분석하고 최적의 답변을 준비 중입니다
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AILoadingCard;
