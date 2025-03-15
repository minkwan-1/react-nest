import { Box, Paper, useMediaQuery, useTheme } from "@mui/material";
import SignInForm from "../components/sign-in/SignInForm";
import SignInSocialButtons from "../components/sign-in/SignInSocialButtons";
import BackgroundImage from "../components/sign-in/BackgroundImage";

const SignUpPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        minHeight: "100vh",
        bgcolor: "#f0f2f5",
        backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)",
      }}
    >
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
          bgcolor: "white",
          backgroundImage: "linear-gradient(135deg, #ffffff 0%, #f9fafc 100%)",
          boxShadow: isSmallScreen ? "none" : "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <SignInSocialButtons />
        <SignInForm />
      </Paper>

      {!isSmallScreen && !isMediumScreen && <BackgroundImage />}
    </Box>
  );
};

export default SignUpPage;
