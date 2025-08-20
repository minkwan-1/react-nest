import { Paper } from "@mui/material";
import { SignInSocialButtons, BenefitsList } from "@domains/auth/index";

const LeftSection = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: { xs: "100%", md: "50%" },
        height: "100vh",
        p: { xs: 3, sm: 4, md: 5 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: 0,

        boxShadow: { xs: "none", sm: "0 4px 20px rgba(0,0,0,0.05)" },
      }}
    >
      <SignInSocialButtons />
      <BenefitsList />
    </Paper>
  );
};

export default LeftSection;
