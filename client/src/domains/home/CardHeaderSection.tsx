import { Box, Avatar, Typography, useTheme } from "@mui/material";

const CardHeaderSection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
        border: "1px solid red",
      }}
    >
      <Avatar
        sx={{
          width: 28,
          height: 28,
          mr: 1,
          bgcolor: "#b8dae1",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        W
      </Avatar>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          color: theme.palette.text.primary,
        }}
      >
        minkwan won
      </Typography>
      <Typography variant="body2" sx={{ mx: 1, color: "#BDBDBD" }}>
        •
      </Typography>
      <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
        2025.7.3.
      </Typography>
    </Box>
  );
};

export default CardHeaderSection;
