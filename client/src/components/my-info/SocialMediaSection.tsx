import { useState } from "react";
import {
  Grow,
  Paper,
  Stack,
  IconButton,
  Typography,
  TextField,
  useTheme,
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

// --- 링크 표시(보기 모드)를 위한 헬퍼 함수 ---
const getIcon = (url: string) => {
  if (url.includes("instagram.com"))
    return <InstagramIcon sx={{ color: "#E4405F" }} />;
  if (url.includes("linkedin.com"))
    return <LinkedInIcon sx={{ color: "#0A66C2" }} />;
  if (url.includes("github.com"))
    return (
      <GitHubIcon
        sx={{
          color: (theme) => (theme.palette.mode === "dark" ? "#fff" : "#333"),
        }}
      />
    );
  return <DefaultLinkIcon color="action" />;
};

const getDomainLabel = (url: string) => {
  try {
    const domain = new URL(url).hostname.replace("www.", "");
    return domain;
  } catch {
    // 유효하지 않은 URL일 경우 원본을 표시
    return url.length > 30
      ? url.substring(0, 27) + "..."
      : url || "잘못된 링크";
  }
};
// ---------------------------------------------

const keyColor = "#b8dae1";

// --- Props 타입 정의 ---
interface SocialMediaSectionProps {
  socialLinks: string[];
  // 부모 컴포넌트에 최종 저장 결과를 전달할 단일 함수
  onSaveLinks: (links: string[]) => void;
}

const SocialMediaSection = ({
  socialLinks,
  onSaveLinks,
}: SocialMediaSectionProps) => {
  const theme = useTheme();

  // --- 컴포넌트 내부 상태 관리 ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 모달 안에서 수정될 임시 링크 상태
  const [tempLinks, setTempLinks] = useState<string[]>([]);

  // --- 핸들러 함수 정의 ---
  const handleOpenModal = () => {
    // 모달을 열 때 현재 링크를 임시 상태로 복사
    setTempLinks([...socialLinks]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = () => {
    // 저장 시 빈 문자열은 제외하고 부모에게 변경사항 전달
    onSaveLinks(tempLinks.filter((link) => link.trim() !== ""));
    handleCloseModal();
  };

  // --- 모달 내부 링크 편집 핸들러 ---
  const handleTempLinkChange = (index: number, value: string) => {
    const newLinks = [...tempLinks];
    newLinks[index] = value;
    setTempLinks(newLinks);
  };

  const handleAddTempLink = () => {
    setTempLinks([...tempLinks, ""]);
  };

  const handleRemoveTempLink = (index: number) => {
    const newLinks = tempLinks.filter((_, i) => i !== index);
    setTempLinks(newLinks);
  };

  return (
    <>
      {/* ==================== 보기 모드 UI ==================== */}
      <Grow in timeout={1400}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
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
                  bgcolor: keyColor,
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
              title="링크 수정"
            >
              <EditIcon />
            </IconButton>
          </Stack>

          <Stack spacing={1.5}>
            {socialLinks && socialLinks.length > 0 ? (
              socialLinks.map((link, index) => (
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
                    backgroundColor: theme.palette.action.hover,
                    transition: "background-color 0.2s, transform 0.2s",
                    "&:hover": {
                      backgroundColor: theme.palette.action.selected,
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
                등록된 링크가 없습니다.
              </Typography>
            )}
          </Stack>
        </Paper>
      </Grow>

      {/* ==================== 수정 모드 UI (모달) ==================== */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle fontWeight="bold">소셜 미디어 링크 수정</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            {tempLinks.map((link, index) => (
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
                  onChange={(e) => handleTempLinkChange(index, e.target.value)}
                  variant="outlined"
                  size="small"
                />
                {tempLinks.length > 1 && (
                  <IconButton
                    onClick={() => handleRemoveTempLink(index)}
                    title="삭제"
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                )}
                {index === tempLinks.length - 1 && (
                  <IconButton onClick={handleAddTempLink} title="링크 추가">
                    <AddIcon />
                  </IconButton>
                )}
              </Stack>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: "0 24px 16px" }}>
          <Button onClick={handleCloseModal}>취소</Button>
          <Button
            onClick={handleSaveChanges}
            variant="contained"
            disableElevation
          >
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SocialMediaSection;
