import { Box, Typography, Link as MuiLink, Stack } from "@mui/material";
import {
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Link as DefaultLinkIcon,
} from "@mui/icons-material";

interface SocialMediaProps {
  socialLink?: string[];
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
  const filteredLinks = socialLink.filter((link) => !!link.trim());

  return (
    <Box sx={{ mt: 2, width: "100%" }}>
      <Typography
        variant="subtitle2"
        fontWeight="bold"
        sx={{ mb: 1, textAlign: "left" }}
      >
        소셜 미디어
      </Typography>

      {filteredLinks.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            p: 3,
            gap: 1.5,
          }}
        >
          <Typography variant="body2" fontWeight={500}>
            우측 하단에 위치한 편집 버튼을 통해, 소셜 미디어 링크를 추가해
            보세요.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={1} direction="column">
          {filteredLinks.map((link, index) => (
            <MuiLink
              color="inherit"
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
      )}
    </Box>
  );
};

export default SocialMedia;
