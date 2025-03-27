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
        ...theme.applyStyles("light", {
          bgcolor: "#f0f2f5",
          backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)",
        }),
        ...theme.applyStyles("dark", {
          bgcolor: "#121212",
          backgroundImage: "linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)",
        }),
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
          boxShadow: isSmallScreen ? "none" : "0 4px 20px rgba(0,0,0,0.05)",
          ...theme.applyStyles("light", {
            bgcolor: "white",
            backgroundImage:
              "linear-gradient(135deg, #ffffff 0%, #f9fafc 100%)",
          }),
          ...theme.applyStyles("dark", {
            bgcolor: "black",

            backgroundImage: "linear-gradient(135deg, black 0%, black 100%)",
            boxShadow: isSmallScreen ? "none" : "0 4px 20px rgba(0,0,0,0.2)",
          }),
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
