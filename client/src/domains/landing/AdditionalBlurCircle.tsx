import { Box } from "@mui/material";

const AdditionalBlurCircle = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        borderRadius: "50%",
        filter: "blur(150px)",
        zIndex: -1,
        width: "35vw",
        height: "35vw",
        bottom: "20vh",
        left: "-10vw",
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? "#aedde5" : "#1e4952",
        opacity: (theme) => (theme.palette.mode === "light" ? 0.7 : 0.15),
      }}
    />
  );
};

export default AdditionalBlurCircle;
