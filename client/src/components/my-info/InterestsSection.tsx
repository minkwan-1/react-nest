import {
  Grow,
  Paper,
  Stack,
  Box,
  IconButton,
  useTheme,
  Typography,
  TextField,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const keyColor = "#b8dae1";
const lightKeyColor = "#f0f8fa";
const darkKeyColor = "#2a4a4f";
const gradientBg = "linear-gradient(135deg, #b8dae1 0%, #9bc5cc 100%)";

// Props 타입 정의
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
  const theme = useTheme();

  // 깃허브 테스트
  return (
    <Grow in timeout={1200}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          background:
            theme.palette.mode === "dark"
              ? `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
              : "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 8px 25px rgba(0,0,0,0.3)"
                : "0 8px 25px rgba(0,0,0,0.1)",
            transform: "translateY(-2px)",
          },
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: 3,
            display: "flex",
            alignItems: "center",
            "&::before": {
              content: '""',
              width: 4,
              height: 20,
              bgcolor: keyColor,
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
                  sx={{
                    background:
                      theme.palette.mode === "dark"
                        ? `linear-gradient(135deg, ${darkKeyColor} 0%, #1a3b40 100%)`
                        : gradientBg,
                    color: "#fff",
                    fontWeight: 500,
                    "& .MuiChip-deleteIcon": {
                      color: "rgba(255,255,255,0.8)",
                      "&:hover": {
                        color: "white",
                      },
                    },
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 4px 12px rgba(42, 74, 79, 0.4)"
                          : "0 4px 12px rgba(184, 218, 225, 0.3)",
                    },
                  }}
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
            sx={{
              flexGrow: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? theme.palette.background.default
                    : lightKeyColor,
                "&:hover": {
                  "& > fieldset": {
                    borderColor: keyColor,
                  },
                },
                "&.Mui-focused": {
                  "& > fieldset": {
                    borderColor: keyColor,
                  },
                },
              },
            }}
          />
          <IconButton
            onClick={handleAddInterest}
            disabled={!interestInput.trim()}
            sx={{
              bgcolor: theme.palette.mode === "dark" ? darkKeyColor : keyColor,
              color: "white",
              "&:hover": {
                bgcolor: theme.palette.mode === "dark" ? "#1a3b40" : "#a5d1d8",
                transform: "scale(1.05)",
              },
              "&:disabled": {
                bgcolor: theme.palette.action.disabledBackground,
                color: theme.palette.action.disabled,
              },
              transition: "all 0.2s ease",
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
