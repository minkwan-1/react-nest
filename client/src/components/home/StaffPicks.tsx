import { Box, Typography, useTheme } from "@mui/material";
import { staffPicks } from "@mock/mockHomePageData";

const StaffPicks = () => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 5, paddingLeft: "20px" }}>
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
            backgroundColor: "#03cb84",
            borderRadius: "10px",
          },
        }}
      >
        주간 인기 TOP 3
      </Typography>

      {staffPicks.map((pick) => (
        <Box
          key={pick.id}
          sx={{
            mb: 2,

            p: 2,
            borderRadius: 2,
            transition: "all 0.3s",
            ...theme.applyStyles("light", {
              backgroundColor: "#ffffff",
              border: "1px solid #E0E0E0",
            }),
            ...theme.applyStyles("dark", {
              backgroundColor: "#333333",
              border: "none",
            }),
            "&:hover": {
              ...theme.applyStyles("light", { backgroundColor: "#F5F5F5" }),
              ...theme.applyStyles("dark", { backgroundColor: "#4F4F4F" }),
              cursor: "pointer",
            },
          }}
        >
          <Box
            sx={{
              gap: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "60px",
                height: "60px",
                borderRadius: 2,
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <img
                src={pick.thumbnail}
                alt={pick.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    ...theme.applyStyles("light", { color: "#212121" }),
                    ...theme.applyStyles("dark", { color: "#F0FBF7" }),
                  }}
                >
                  {pick.author}
                </Typography>
              </Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: "bold",
                  mb: 0.5,
                  lineHeight: 1.3,
                  ...theme.applyStyles("light", { color: "#212121" }),
                  ...theme.applyStyles("dark", { color: "#F0FBF7" }),
                }}
              >
                {pick.title}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  ...theme.applyStyles("light", { color: "#757575" }),
                  ...theme.applyStyles("dark", { color: "#BDBDBD" }),
                }}
              >
                {pick.date}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default StaffPicks;
