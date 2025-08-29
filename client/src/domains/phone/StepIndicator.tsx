import { Box, Typography } from "@mui/material";
import { verification1 } from "../../images/index";

interface StepIndicatorProps {
  step: number;
  totalSteps: number;
}

const StepIndicator = ({ step, totalSteps }: StepIndicatorProps) => {
  const stepTitles = {
    1: "안전한 서비스 이용을 위해 휴대폰 번호를 인증해 주세요",
    2: "전송된 인증 코드를 입력해 주세요",
    3: "휴대폰 인증이 완료되었습니다",
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        component="img"
        src={verification1}
        alt="휴대폰 인증 이미지"
        sx={{
          animation: "floating 3s ease-in-out infinite",
          "@keyframes floating": {
            "0%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-10px)" },
            "100%": { transform: "translateY(0px)" },
          },
          width: "100%",
          maxWidth: 200,
          mx: "auto",
          display: "block",
          mb: 2,
        }}
      />

      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {step}/{totalSteps} 단계
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 400, mx: "auto" }}
        >
          {stepTitles[step as keyof typeof stepTitles]}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "center",
          mb: 3,
        }}
      >
        {Array.from({ length: totalSteps }, (_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: index < step ? "#b8dae1" : "divider",
              transition: "all 0.3s",
              transform: index < step ? "scale(1.2)" : "scale(1)",
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          width: "100%",
          opacity: 0.3,
        }}
      />
    </Box>
  );
};

export default StepIndicator;
