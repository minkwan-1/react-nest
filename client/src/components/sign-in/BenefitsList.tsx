// components/sign-up/BenefitsList.tsx
import { Box, Typography, useTheme } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const BenefitsList = () => {
  const theme = useTheme();

  const benefits = [
    "간편한 로그인으로 빠르게 서비스를 이용하실 수 있습니다.",
    "소셜 계정 연동으로 아이디와 비밀번호를 기억할 필요가 없습니다.",
    "안전한 인증 시스템을 통해 개인정보가 철저히 보호됩니다.",
  ];

  return (
    <Box sx={{ mt: 4, mb: 2 }}>
      <Typography
        variant="body1"
        sx={{
          mb: 2,
          fontWeight: 500,
          ...theme.applyStyles("light", {
            color: "#555",
          }),
          ...theme.applyStyles("dark", {
            color: "#b0b0b0",
          }),
        }}
      >
        소셜 계정으로 Pullim 로그인
      </Typography>

      {benefits.map((benefit, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1.5,
          }}
        >
          <CheckCircleOutlineIcon
            fontSize="small"
            sx={{
              mr: 1.5,
              ...theme.applyStyles("light", {
                color: "#03cb84",
              }),
              ...theme.applyStyles("dark", {
                color: "#03cb84",
              }),
            }}
          />
          <Typography
            variant="body2"
            sx={{
              ...theme.applyStyles("light", {
                color: "#333",
              }),
              ...theme.applyStyles("dark", {
                color: "#e0e0e0",
              }),
            }}
          >
            {benefit}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default BenefitsList;
