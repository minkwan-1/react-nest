import {
  Grow,
  Paper,
  Stack,
  Box,
  IconButton,
  Typography,
  TextField,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface InterestsSectionProps {
  interests: string[];
  handleDeleteInterest: (interest: string) => void;
  interestInput: string;
  setInterestInput: (value: string) => void;
  handleAddInterest: () => void;
}

const InterestsSection = ({
  interests,
  handleDeleteInterest,
  interestInput,
  setInterestInput,
  handleAddInterest,
}: InterestsSectionProps) => {
  return (
    <Grow in timeout={1200}>
      <Paper
        variant="outlined"
        sx={(theme) => ({
          p: 4,
          mb: 4,
          borderRadius: 3,
          backgroundColor: "background.paper",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: theme.shadows[4],
            transform: "translateY(-2px)",
          },
        })}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 600,
            mb: 3,
            display: "flex",
            alignItems: "center",
            "&::before": {
              content: '""',
              width: 4,
              height: 20,
              bgcolor: "#b8dae1",
              borderRadius: 2,
              mr: 2,
            },
          }}
        >
          관심 분야
        </Typography>

        {interests.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              sx={{ gap: 1.5 }}
            >
              {interests.map((interest, index) => (
                <Chip
                  key={index}
                  label={interest}
                  onDelete={() => handleDeleteInterest(interest)}
                />
              ))}
            </Stack>
          </Box>
        )}

        <Stack direction="row" spacing={1.5} alignItems="center">
          <TextField
            size="small"
            placeholder="추가할 관심 분야를 입력하세요"
            value={interestInput}
            onChange={(e) => setInterestInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddInterest()}
            sx={{ flexGrow: 1 }}
          />
          <IconButton
            onClick={handleAddInterest}
            disabled={!interestInput.trim()}
            sx={{
              bgcolor: "#b8dae1",
              color: "primary.contrastText",
              "&:hover": {
                bgcolor: "#b8dae1",
              },
            }}
          >
            <AddIcon />
          </IconButton>
        </Stack>
      </Paper>
    </Grow>
  );
};

export default InterestsSection;
