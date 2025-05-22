// components/sign-up/BenefitsList.tsx
import { Box, Typography, useTheme } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const BenefitsList = () => {
  const theme = useTheme();

  const benefits = [
    "한 번의 클릭으로 복잡한 회원가입 절차 없이 즉시 이용하실 수 있습니다.",
    "소셜 계정 연동으로 별도 아이디/비밀번호를 기억하실 필요가 없습니다.",
    "안전한 로그인 인증 시스템으로 개인정보 보호가 강화됩니다.",
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
        소셜 계정으로 Pullim 가입
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
                color: "#b8dae1",
              }),
              ...theme.applyStyles("dark", {
                color: "#b8dae1",
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
