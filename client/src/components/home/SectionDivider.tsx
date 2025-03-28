import { Box } from "@mui/material";

const SectionDivider = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: "66.67%",
        width: "1px",
        height: "100vh",
        bgcolor: "#E0E0E0",
        zIndex: 1,
      }}
    />
  );
};

export default SectionDivider;
