import { Box, Typography } from "@mui/material";
import { verification } from "../../images/index";

const PhoneVerificationTitle = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box
        component="img"
        src={verification}
        alt="휴대폰 인증 이미지"
        sx={{
          animation: "floating 3s ease-in-out infinite",
          "@keyframes floating": {
            "0%": {
              transform: "translateY(0px)",
            },
            "50%": {
              transform: "translateY(-10px)",
            },
            "100%": {
              transform: "translateY(0px)",
            },
          },
          width: "100%",
          maxWidth: 200,
          mx: "auto",
          display: "block",
          mb: 2,
        }}
      />

      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 400, mx: "auto" }}
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
