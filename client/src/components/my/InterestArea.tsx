import { Typography, Box, Chip, useTheme } from "@mui/material";

interface InterestAreaProps {
  interests: string[];
}

const InterestArea: React.FC<InterestAreaProps> = ({ interests }) => {
  const theme = useTheme();

  const koreanContent = {
    interests: "관심 분야",
  };

  const themeColors = {
    primary: theme.palette.primary.main,
    primaryDark: "#02b676",
    background: theme.palette.mode === "light" ? "#f8f9fa" : "#121212",
    cardBg: theme.palette.background.paper,
    border: theme.palette.mode === "light" ? "#e0e0e0" : "#333333",
    textPrimary: theme.palette.text.primary,
    textSecondary: theme.palette.text.secondary,
    divider: theme.palette.mode === "light" ? "#e0e0e0" : "#424242",
  };

  return (
    <>
      <Typography
        variant="subtitle2"
        fontWeight="bold"
        sx={{ width: "100%", textAlign: "left", mb: 1 }}
      >
        {koreanContent.interests}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.5,
          mb: 3,
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        {interests.slice(0, 8).map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            size="small"
            variant="outlined"
            sx={{
              borderColor: themeColors.border,
              color: themeColors.textSecondary,
              fontSize: "0.75rem",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "rgba(3, 203, 132, 0.08)"
                    : "rgba(184, 218, 225, 0.1)",
                borderColor: "#b8dae1",
                color:
                  theme.palette.mode === "light"
                    ? themeColors.primaryDark
                    : "#b8dae1",
              },
            }}
          />
        ))}
        {interests.length > 8 && (
          <Chip
            label={`+${interests.length - 8}`}
            size="small"
            sx={{
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(3, 203, 132, 0.08)"
                  : "rgba(184, 218, 225, 0.1)",
              color:
                theme.palette.mode === "light"
                  ? themeColors.primary
                  : "#b8dae1",
              fontSize: "0.75rem",
            }}
          />
        )}
      </Box>
    </>
  );
};

export default InterestArea;
