import { Box, Button } from "@mui/material";

const SubmitButton = () => {
  return (
    <Box>
      <Button type="submit" variant="contained" sx={{ bgcolor: "#03cb84" }}>
        Submit Question
      </Button>
    </Box>
  );
};

export default SubmitButton;
