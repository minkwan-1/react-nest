import { Box } from "@mui/material";
import { LandingTitle } from "@components/landing/index";

const MainContent = () => {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "60%" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        pl: { xs: 4, sm: 10 },
        pr: 4,
        py: { xs: 4, sm: 8 },
      }}
    >
      <LandingTitle />
    </Box>
  );
};

export default MainContent;
