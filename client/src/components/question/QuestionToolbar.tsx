import { Box, Typography, TextField, Button } from "@mui/material";

const QuestionToolbar = () => {
  return (
    <Box>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Top Questions
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search..."
          sx={{ flex: 1, mr: 2 }}
        />
        <Button sx={{ background: "black", color: "white", minHeight: "55px" }}>
          Ask Question
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionToolbar;
