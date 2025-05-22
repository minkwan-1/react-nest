import { Box, Typography, Chip, useTheme } from "@mui/material";

const PopularTagsSection = () => {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 5, paddingLeft: "20px" }}>
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
            backgroundColor: "#c5a3d5",
            borderRadius: "10px",
          },
        }}
      >
        인기 태그
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {[
          "JavaScript",
          "React",
          "TypeScript",
          "NextJS",
          "CSS",
          "Node.js",
          "API",
          "Frontend",
        ].map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            size="small"
            sx={{
              borderRadius: 4,
              bgcolor: "transparent",
              color: "#757575",
              mb: 1,
              border: "1px solid #E0E0E0",
              "&:hover": {
                "&:hover": {
                  ...theme.applyStyles("light", {
                    backgroundColor: "#F5F5F5",
                  }),
                  ...theme.applyStyles("dark", {
                    backgroundColor: "#4F4F4F",
                  }),
                },
                color: "#c5a3d5",
                border: "1px solid #c5a3d5",
              },
            }}
            clickable
          />
        ))}
      </Box>
    </Box>
  );
};

export default PopularTagsSection;
