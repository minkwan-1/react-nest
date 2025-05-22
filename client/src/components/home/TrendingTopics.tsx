import { Box, Typography, Chip, useTheme } from "@mui/material";
import { recommendedTopics } from "@mock/mockHomePageData";

const TrendingTopics = () => {
  const theme = useTheme();
  return (
    <Box sx={{ paddingLeft: "20px" }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          mb: 2.5,
          ...theme.applyStyles("light", { color: "#212121" }),
          ...theme.applyStyles("dark", { color: "#ffffff" }),
          fontSize: "18px",
          position: "relative",
          display: "inline-block",
          "&:after": {
            content: '""',
            position: "absolute",
            width: "40%",
            height: "3px",
            left: 0,
            bottom: "-8px",
            backgroundColor: "#b8dae1",
            borderRadius: "10px",
          },
        }}
      >
        추천 토픽
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {recommendedTopics.map((topic, index) => (
          <Chip
            key={index}
            label={`${topic.name} (${topic.count})`}
            sx={{
              borderRadius: 8,
              bgcolor: "#F5F5F5",
              color: "#757575",
              mb: 1.5,
              py: 2.5,
              border: "1px solid #EEEEEE",
              fontWeight: 500,
              transition: "all 0.2s",
              ...theme.applyStyles("light", {
                backgroundColor: "#F5F5F5",
                color: "#757575",
                border: "1px solid #EEEEEE",
              }),
              ...theme.applyStyles("dark", {
                backgroundColor: "#4F4F4F",
                color: "#F0FBF7",
                border: "1px solid #333333",
              }),
              "&:hover": {
                ...theme.applyStyles("light", {
                  backgroundColor: "#E0E0E0",
                }),
                ...theme.applyStyles("dark", {
                  backgroundColor: "#616161",
                }),
                border: "1px solid #b8dae1",
                boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
                color: "#b8dae1",
              },
            }}
            clickable
          />
        ))}
      </Box>
    </Box>
  );
};

export default TrendingTopics;
