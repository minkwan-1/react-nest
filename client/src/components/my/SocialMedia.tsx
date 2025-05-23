import { Typography, Box, IconButton, useTheme } from "@mui/material";
import {
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";

const SocialMedia = () => {
  const theme = useTheme();

  const koreanContent = {
    followers: "팔로워",
    following: "팔로잉",
    interests: "관심 분야",
    socialMedia: "소셜 미디어",
  };
  return (
    <>
      <Typography
        variant="subtitle2"
        fontWeight="bold"
        sx={{ width: "100%", textAlign: "left", mb: 1 }}
      >
        {koreanContent.socialMedia}
      </Typography>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          mb: 2,
          justifyContent: "flex-start",
          gap: 1,
        }}
      >
        <IconButton
          size="small"
          sx={{
            color: "#E4405F",
            "&:hover": {
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(228, 64, 95, 0.1)"
                  : "rgba(228, 64, 95, 0.2)",
            },
          }}
        >
          <InstagramIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            color: "#0A66C2",
            "&:hover": {
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(10, 102, 194, 0.1)"
                  : "rgba(10, 102, 194, 0.2)",
            },
          }}
        >
          <LinkedInIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            color: theme.palette.mode === "light" ? "#333" : "#fff",
            "&:hover": {
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(51, 51, 51, 0.1)"
                  : "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <GitHubIcon fontSize="small" />
        </IconButton>
      </Box>
    </>
  );
};

export default SocialMedia;
