import { Box, Button, Typography } from "@mui/material";

const GlobalActionButton = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 30,
        right: 30,
        zIndex: 1000,
      }}
    >
      <Button
        variant="contained"
        sx={{
          bgcolor: "#03cb84",
          borderRadius: "50%",
          width: 64,
          height: 64,
          minWidth: 0,
          boxShadow: "0 4px 12px rgba(3,203,132,0.5)",
          transition: "all 0.3s",
          "&:hover": {
            bgcolor: "#02a770",
            boxShadow: "0 6px 16px rgba(3,203,132,0.6)",
            transform: "translateY(-2px)",
          },
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          +
        </Typography>
      </Button>
    </Box>
  );
};

export default GlobalActionButton;
