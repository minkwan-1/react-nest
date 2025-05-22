import { Box, Typography, useTheme } from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

const PageTitle = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        mb: 3,
      }}
    >
      <LightbulbOutlinedIcon
        sx={{
          color: "#c5a3d5",
          fontSize: 40,
        }}
      />
      <Typography
        sx={{
          color: theme.palette.text.primary,
          fontSize: { xs: "28px", md: "36px" },
          fontWeight: 700,
          letterSpacing: "-0.5px",
        }}
      >
        AI에게 물어보세요
      </Typography>
    </Box>
  );
};

export default PageTitle;
