import { Box, Typography } from "@mui/material";
import { verification1 } from "../../images/index";

interface PhoneVerificationTitleProps {
  step: number;
  totalSteps: number;
}

const PhoneVerificationTitle = ({
  step,
  totalSteps,
}: PhoneVerificationTitleProps) => {
  // 각 단계별 제목 정의
  const stepTitles = {
    1: "안전한 서비스 이용을 위해 휴대폰 번호를 인증해 주세요",
    2: "전송된 인증 코드를 입력해 주세요",
    3: "휴대폰 인증이 완료되었습니다",
  };

  return (
    <Box sx={{ mb: 4 }}>
      {/* 상단 이미지 */}
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

      {/* 단계 표시 및 단계별 제목 */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        {/* 현재 단계 표시 */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {step}/{totalSteps} 단계
        </Typography>

        {/* 단계별 설명 텍스트 */}
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 400, mx: "auto" }}
        >
          {stepTitles[step as keyof typeof stepTitles]}
        </Typography>
      </Box>

      {/* 하단 점 형태의 단계 인디케이터 */}
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

      {/* 하단 구분선 */}
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

export default PhoneVerificationTitle;
