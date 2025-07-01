import {
  Box,
  Typography,
  Link as MuiLink,
  Stack,
  useTheme,
} from "@mui/material";
import {
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Link as DefaultLinkIcon,
} from "@mui/icons-material";

interface SocialMediaProps {
  socialLink?: string[]; // ✅ optional 처리
}

const getIcon = (url: string) => {
  if (url.includes("instagram.com"))
    return <InstagramIcon sx={{ color: "#E4405F" }} />;
  if (url.includes("linkedin.com"))
    return <LinkedInIcon sx={{ color: "#0A66C2" }} />;
  if (url.includes("github.com")) return <GitHubIcon sx={{ color: "#333" }} />;
  return <DefaultLinkIcon color="action" />;
};

const getDomainLabel = (url: string) => {
  try {
    const domain = new URL(url).hostname.replace("www.", "");
    return domain;
  } catch {
    return "링크";
  }
};

const SocialMedia = ({ socialLink = [] }: SocialMediaProps) => {
  const theme = useTheme();
  const filteredLinks = socialLink.filter((link) => !!link.trim());

  if (filteredLinks.length === 0) return null;

  return (
    <Box sx={{ mt: 2, width: "100%" }}>
      <Typography
        variant="subtitle2"
        fontWeight="bold"
        sx={{ mb: 1, textAlign: "left" }}
      >
        소셜 미디어
      </Typography>

      <Stack spacing={1} direction="column">
        {filteredLinks.map((link, index) => (
          <MuiLink
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 1.5,
              px: 1,
              py: 0.75,
              borderRadius: 1,
              fontSize: "0.95rem",
              color: theme.palette.text.primary,
              backgroundColor:
                theme.palette.mode === "light" ? "#f8f9fa" : "#1e293b",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "#f0f4f8"
                    : "rgba(255,255,255,0.05)",
              },
              transition: "background-color 0.2s",
            }}
          >
            {getIcon(link)}
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {getDomainLabel(link)}
            </Typography>
          </MuiLink>
        ))}
      </Stack>
    </Box>
  );
};

export default SocialMedia;
