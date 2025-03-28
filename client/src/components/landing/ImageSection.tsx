import { Box, useTheme, keyframes } from "@mui/material";

// 코드 라인 길이 변화 애니메이션 정의
const expandLine = keyframes`
  0% { width: var(--initial-width); }
  50% { width: var(--expanded-width); }
  100% { width: var(--initial-width); }
`;

// 코드 라인 깜빡임 애니메이션
const blink = keyframes`
  0% { opacity: 0.7; }
  50% { opacity: 0.9; }
  100% { opacity: 0.7; }
`;

// 전체 코드 영역 부드러운 움직임
const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const ImageSection = () => {
  const theme = useTheme();

  // 애니메이션 타이밍과 속성을 다양하게 생성
  const getAnimationProps = (index: number) => {
    // 초기 너비와 확장 너비 계산 (너무 크게 변하지 않도록 제한)
    const initialWidth = Math.random() * 30 + 40; // 40~70% 범위
    const expandedWidth = Math.min(initialWidth + Math.random() * 10, 80); // 최대 80%로 제한

    // 애니메이션 지연 시간 (너무 많은 라인이 동시에 움직이지 않도록 분산)
    const delay = (index * 0.4) % 3; // 0~3초 사이로 분산

    // 애니메이션 속도 (4~6초 사이로 설정)
    const duration = Math.random() * 2 + 4;

    return {
      "--initial-width": `${initialWidth}%`,
      "--expanded-width": `${expandedWidth}%`,
      animation: `${expandLine} ${duration}s ease-in-out infinite ${delay}s`,
      // 특정 라인은 깜빡이는 효과 추가 (모든 라인이 깜빡이면 산만해 보임)
      ...(index % 7 === 0 && {
        animation: `${expandLine} ${duration}s ease-in-out infinite ${delay}s, ${blink} ${
          duration / 2
        }s ease-in-out infinite`,
      }),
    };
  };

  return (
    <Box
      sx={{
        width: "40%",
        position: "relative",
        overflow: "hidden",
        display: { xs: "none", md: "flex" },
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "80%",
          height: "60%",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          animation: `${float} 8s ease-in-out infinite`,
          transform: "translateZ(0)", // 성능 최적화
          ...theme.applyStyles("light", { bgcolor: "#03cb84" }),
          ...theme.applyStyles("dark", { bgcolor: "#00775a" }),
          boxShadow:
            theme.palette.mode === "light"
              ? "0 15px 30px rgba(3, 203, 132, 0.3)"
              : "0 15px 30px rgba(0, 119, 90, 0.3)",
        }}
      >
        <Box
          sx={{
            width: "80%",
            height: "80%",
            borderRadius: "6px",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1.5, // 라인 간격 늘림
            position: "relative",
            ...theme.applyStyles("light", { bgcolor: "#1e1e1e" }),
            ...theme.applyStyles("dark", { bgcolor: "#000" }),
            "&::before": {
              content: '""',
              position: "absolute",
              top: 15,
              left: 10,
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "red",
              boxShadow: "16px 0 0 yellow, 32px 0 0 green",
              opacity: 0.7,
            },
          }}
        >
          {/* 라인 수를 10개로 줄여서 더 깔끔하게 보이도록 조정 */}
          <Box sx={{ mt: 4 }}>
            {Array.from({ length: 10 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  height: "8px",
                  mt: 2,
                  minHeight: "8px", // 높이가 줄어들지 않도록 고정
                  opacity: 0.7,
                  borderRadius: "4px",
                  alignSelf: "flex-start", // 왼쪽 정렬 확실히
                  bgcolor:
                    index % 3 === 0
                      ? "#FFD700"
                      : index % 3 === 1
                      ? "#9370DB"
                      : "#4FC3F7",
                  ...getAnimationProps(index),
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageSection;
