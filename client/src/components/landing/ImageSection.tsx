import { Box } from "@mui/material";
import { laptop } from "../../images/index";
// import { useTheme } from "@mui/material";
interface ImageSectionProps {
  isMobile?: boolean;
}

const ImageSection = ({ isMobile = false }: ImageSectionProps) => {
  // const theme = useTheme();
  return (
    <Box
      sx={{
        // border: "1px solid green",
        width: { xs: "100%", md: "45%" },
        height: { xs: "280px", sm: "320px", md: "auto" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        order: { xs: 1, md: 2 },
        mb: { xs: 3, md: 0 },
        // px: { xs: 3, md: 4 },
      }}
    >
      <Box
        component="img"
        src={laptop}
        alt="Laptop Illustration"
        sx={{
          width: isMobile ? "85%" : "100%",

          // ...theme.applyStyles("dark", {
          //   bgcolor: "#121212",
          // }),
          maxWidth: "100%",
          height: "auto",
          objectFit: "contain",
          // border: "1px solid blue",
          // borderRadius: "8px",
          // boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
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
        }}
      />
    </Box>
  );
};

export default ImageSection;
