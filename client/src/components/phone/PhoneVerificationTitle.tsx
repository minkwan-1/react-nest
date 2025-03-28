import { Box, Typography } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const PhoneVerificationTitle = () => {
  const keyColor = "#03cb84";

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: keyColor, // 키 컬러 적용
            color: "white",
            width: 70,
            height: 70,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 8px 20px ${keyColor}40`, // 키 컬러의 그림자
            mb: 2,
          }}
        >
          <VerifiedUserIcon sx={{ fontSize: 32 }} />
        </Box>

        <Typography
          variant="h4"
          fontWeight="700"
          sx={{
            mb: 1,
            background: `linear-gradient(45deg, ${keyColor}, ${keyColor}CC)`, // 키 컬러 그라데이션
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          휴대폰 인증
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: 400,
            mx: "auto",
          }}
        >
          안전한 서비스 이용을 위해 휴대폰 번호를 인증해 주세요
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 4,
          borderBottom: "1px solid",
          borderColor: "divider",
          width: "100%",
          opacity: 0.3,
        }}
      />
    </Box>
  );
};

export default PhoneVerificationTitle;
