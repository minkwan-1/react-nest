import { Box, useTheme } from "@mui/material";

const SectionDivider = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "none", md: "block" },
        position: "absolute",
        top: 0,
        left: "60%",
        width: "1px",
        height: "100vh",
        ...theme.applyStyles("light", { bgcolor: "#E0E0E0" }),
        ...theme.applyStyles("dark", { bgcolor: "#616161" }),
        zIndex: 1,
      }}
    />
  );
};

export default SectionDivider;
