import { Box, useTheme } from "@mui/material";

const SectionDivider = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: "66.67%",
        width: "1px",
        height: "100vh",
        ...theme.applyStyles("light", { bgcolor: "#E0E0E0" }), // 라이트 모드 색상
        ...theme.applyStyles("dark", { bgcolor: "#616161" }), // 다크 모드 색상
        zIndex: 1,
      }}
    />
  );
};

export default SectionDivider;
