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
  const theme = useTheme();
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

      {/* 분기 처리: 링크가 없을 때와 있을 때를 나눔 */}
      {filteredLinks.length === 0 ? (
        // 링크가 없을 때 표시할 초기 UI (Empty State)
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `2px dashed ${theme.palette.divider}`,
            borderRadius: 2,
            p: 3,
            gap: 1.5,
            backgroundColor:
              theme.palette.mode === "light"
                ? "#f8f9fa"
                : "rgba(255,255,255,0.04)",
            color: theme.palette.text.secondary,
          }}
        >
          <Typography variant="body2" fontWeight={500}>
            우측 하단에 위치한 편집 버튼을 통해, 소셜 미디어 링크를 추가해
            보세요.
          </Typography>
        </Box>
      ) : (
        // 링크가 있을 때 표시할 기존 UI
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
      )}
    </Box>
  );
};

export default SocialMedia;
