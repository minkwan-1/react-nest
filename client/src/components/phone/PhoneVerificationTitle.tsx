import { Box, Avatar, Typography, Divider } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const PhoneVerificationTitle = () => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
          <VerifiedUserIcon />
        </Avatar>
        <Typography variant="h5" fontWeight="600">
          휴대폰 인증
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />
    </>
  );
};

export default PhoneVerificationTitle;
