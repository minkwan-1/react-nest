import { Box } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export const NaverIcon = () => (
  <Box
    sx={{
      width: 22,
      height: 22,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      bgcolor: "#03C75A",
      color: "white",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "bold",
      boxShadow: "0 2px 4px rgba(3, 199, 90, 0.3)",
    }}
  >
    N
  </Box>
);

export const KakaoIcon = () => (
  <Box
    sx={{
      width: 22,
      height: 22,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      bgcolor: "#FEE500",
      borderRadius: "6px",
      boxShadow: "0 2px 4px rgba(254, 229, 0, 0.3)",
    }}
  >
    <svg viewBox="0 0 24 24" width="16" height="16">
      <path
        fill="#000000"
        d="M12,2C6.477,2,2,5.477,2,9.667c0,2.913,1.89,5.471,4.737,6.929l-1.21,4.477c-0.102,0.379,0.357,0.711,0.688,0.498l5.478-3.762C11.797,17.934,11.899,18,12,18c5.523,0,10-3.477,10-8.333C22,5.477,17.523,2,12,2z"
      />
    </svg>
  </Box>
);

export { GoogleIcon };
