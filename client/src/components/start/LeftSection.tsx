import { Paper, useMediaQuery, useTheme } from "@mui/material";
import { SignInSocialButtons, BenefitsList } from "@components/start/index";

const LeftSection = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  return (
    <Paper
      elevation={0}
      sx={{
        width: isMediumScreen || isSmallScreen ? "100%" : "50%",
        height: "100vh",
        p: { xs: 3, sm: 4, md: 5 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: 0,
        boxShadow: isSmallScreen ? "none" : "0 4px 20px rgba(0,0,0,0.05)",
        ...theme.applyStyles("light", {
          bgcolor: "white",
          backgroundImage: "linear-gradient(135deg, #ffffff 0%, #f9fafc 100%)",
        }),
        ...theme.applyStyles("dark", {
          bgcolor: "black",

          backgroundImage: "linear-gradient(135deg, black 0%, black 100%)",
          boxShadow: isSmallScreen ? "none" : "0 4px 20px rgba(0,0,0,0.2)",
        }),
      }}
    >
      <SignInSocialButtons />
      <BenefitsList />
    </Paper>
  );
};

export default LeftSection;
