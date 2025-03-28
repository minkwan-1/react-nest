import { Box, useTheme } from "@mui/material";

const ImageSection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "40%",
        position: "relative",
        overflow: "hidden",
        display: { xs: "none", md: "flex" },
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "80%",
          height: "60%",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...theme.applyStyles("light", { bgcolor: "#03cb84" }),
          ...theme.applyStyles("dark", { bgcolor: "#00775a" }),
        }}
      >
        <Box
          sx={{
            width: "80%",
            height: "80%",
            borderRadius: "6px",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            ...theme.applyStyles("light", { bgcolor: "#1e1e1e" }),
            ...theme.applyStyles("dark", { bgcolor: "#000" }),
          }}
        >
          {Array.from({ length: 15 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                width: `${Math.random() * 50 + 40}%`,
                height: "8px",
                opacity: 0.7,
                bgcolor:
                  index % 3 === 0
                    ? "#FFD700"
                    : index % 3 === 1
                    ? "#9370DB"
                    : "#4FC3F7",
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ImageSection;
