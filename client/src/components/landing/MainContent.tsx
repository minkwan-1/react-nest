import { Box } from "@mui/material";
import { LandingTitle } from "@components/landing/index";

const MainContent = () => {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "60%" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        pl: { xs: 3, sm: 4, md: 8, lg: 10 },
        pr: { xs: 3, sm: 4 },
        py: { xs: 6, sm: 8 },
        order: { xs: 2, md: 1 },
      }}
    >
      <LandingTitle />
    </Box>
  );
};

export default MainContent;
