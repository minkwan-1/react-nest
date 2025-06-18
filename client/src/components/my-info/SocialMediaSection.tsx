import {
  Grow,
  Paper,
  Stack,
  IconButton,
  Typography,
  TextField,
  useTheme,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const keyColor = "#b8dae1";
const lightKeyColor = "#f0f8fa";

// Props 타입 정의
interface SocialMediaSectionProps {
  socialLinks: string[];
  handleSocialLinkChange: (index: number, value: string) => void;
  handleAddSocialLink: () => void;
  handleRemoveSocialLink: (index: number) => void;
}

const SocialMediaSection = ({
  socialLinks,
  handleSocialLinkChange,
  handleAddSocialLink,
  handleRemoveSocialLink,
}: SocialMediaSectionProps) => {
  const theme = useTheme();

  return (
    <Grow in timeout={1400}>
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
          소셜 미디어 링크
        </Typography>

        <Stack spacing={2.5}>
          {socialLinks.map((link, index) => (
            <Stack key={index} direction="row" spacing={1} alignItems="center">
              <TextField
                fullWidth
                placeholder="Github, Blog, LinkedIn 등의 링크를 입력하세요"
                value={link}
                onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? theme.palette.background.default
                        : lightKeyColor,
                    transition: "all 0.2s ease",
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

              {socialLinks.length > 1 && (
                <IconButton
                  onClick={() => handleRemoveSocialLink(index)}
                  size="small"
                  sx={{
                    color: theme.palette.error.main,
                    "&:hover": {
                      bgcolor: theme.palette.error.main + "20",
                    },
                  }}
                >
                  ×
                </IconButton>
              )}
            </Stack>
          ))}

          <Button
            onClick={handleAddSocialLink}
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{
              alignSelf: "flex-start",
              borderColor: keyColor,
              color: keyColor,
              borderRadius: 2,
              px: 3,
              py: 1,
              fontWeight: 500,
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: keyColor,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? theme.palette.action.hover
                    : lightKeyColor,
                transform: "translateY(-1px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 4px 12px rgba(42, 74, 79, 0.3)"
                    : "0 4px 12px rgba(184, 218, 225, 0.2)",
              },
            }}
          >
            링크 추가
          </Button>
        </Stack>
      </Paper>
    </Grow>
  );
};

export default SocialMediaSection;
