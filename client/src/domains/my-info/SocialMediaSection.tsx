import { useState } from "react";
import {
  Grow,
  Paper,
  Stack,
  IconButton,
  Typography,
  TextField,
  Link as MuiLink,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Add as AddIcon,
  RemoveCircleOutline as RemoveCircleOutlineIcon,
  Edit as EditIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Link as DefaultLinkIcon,
} from "@mui/icons-material";

const getIcon = (url: string) => {
  if (url.includes("instagram.com"))
    return <InstagramIcon sx={{ color: "#E4405F" }} />;
  if (url.includes("linkedin.com"))
    return <LinkedInIcon sx={{ color: "#0A66C2" }} />;
  if (url.includes("github.com"))
    return <GitHubIcon sx={{ color: "text.primary" }} />;
  return <DefaultLinkIcon color="action" />;
};

const getDomainLabel = (url: string) => {
  try {
    const domain = new URL(url).hostname.replace("www.", "");
    return domain;
  } catch {
    return url.length > 30
      ? url.substring(0, 27) + "..."
      : url || "Invalid Link";
  }
};

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Grow in timeout={1400}>
        <Paper variant="outlined" sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{
                display: "flex",
                alignItems: "center",
                "&::before": {
                  content: '""',
                  width: 4,
                  height: 20,
                  bgcolor: "#b8dae1",
                  borderRadius: 2,
                  mr: 2,
                },
              }}
            >
              소셜 미디어 링크
            </Typography>
            <IconButton
              onClick={handleOpenModal}
              size="small"
              title="Edit Links"
            >
              <EditIcon />
            </IconButton>
          </Stack>
          <Stack spacing={1.5}>
            {socialLinks &&
            socialLinks.filter((link) => link.trim()).length > 0 ? (
              socialLinks
                .filter((link) => link.trim())
                .map((link, index) => (
                  <MuiLink
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="none"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: "action.hover",
                      transition: "background-color 0.2s, transform 0.2s",
                      "&:hover": {
                        backgroundColor: "action.selected",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    {getIcon(link)}
                    <Typography variant="body2" color="text.primary">
                      {getDomainLabel(link)}
                    </Typography>
                  </MuiLink>
                ))
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ pl: 1 }}>
                아직 추가된 링크가 없어요.
              </Typography>
            )}
          </Stack>
        </Paper>
      </Grow>

      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle fontWeight="bold">소셜 미디어 링크 수정하기</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            {socialLinks.map((link, index) => (
              <Stack
                key={index}
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <TextField
                  fullWidth
                  placeholder="https://github.com/..."
                  value={link}
                  onChange={(e) =>
                    handleSocialLinkChange(index, e.target.value)
                  }
                  variant="outlined"
                  size="small"
                />
                {socialLinks.length > 1 && (
                  <IconButton
                    onClick={() => handleRemoveSocialLink(index)}
                    title="Remove"
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                )}
              </Stack>
            ))}
            <Button
              onClick={handleAddSocialLink}
              startIcon={<AddIcon />}
              sx={{ alignSelf: "flex-start", color: "#b8dae1" }}
            >
              링크 추가하기
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: "0 24px 16px" }}>
          <Button
            onClick={handleCloseModal}
            sx={{ color: "#b8dae1", border: "1px solid #b8dae1" }}
          >
            취소
          </Button>
          <Button
            onClick={handleCloseModal}
            sx={{ bgcolor: "#b8dae1", color: "#fff" }}
            disableElevation
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SocialMediaSection;
