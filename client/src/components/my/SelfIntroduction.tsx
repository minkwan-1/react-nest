import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  useTheme,
  TextField,
  IconButton,
  Box,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { Edit, Check, Close } from "@mui/icons-material";
import axios from "axios";
import { realUserInfo } from "@atom/auth";
import { useAtom } from "jotai";

const MAX_LENGTH = 80;

const SelfIntroduction = () => {
  const theme = useTheme();
  const [selfIntro, setSelfIntro] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user] = useAtom(realUserInfo);

  // 컴포넌트 마운트 시 기존 소개 불러오기
  useEffect(() => {
    const fetchSelfIntro = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/self-intro?id=${user.id}`
        );
        setSelfIntro(response.data.selfIntro || "");
      } catch (error) {
        console.error("소개 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSelfIntro();
  }, [user?.id]);

  const handleSave = async () => {
    if (selfIntro.length > MAX_LENGTH) return;
    setSaving(true);
    try {
      await axios.put("http://localhost:3000/self-intro", {
        id: user?.id,
        selfIntro,
      });
      setEditing(false);
    } catch (error) {
      console.error("소개 저장 실패:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleClear = () => {
    // setSelfIntro("");
    setEditing(false);
  };

  const themeColors = {
    cardBg: theme.palette.background.paper,
    border: theme.palette.mode === "light" ? "#e0e0e0" : "#333333",
    textSecondary: theme.palette.text.secondary,
  };

  // 로딩 중일 때 표시할 내용
  if (loading) {
    return (
      <>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mb: 2, display: "flex", alignItems: "center" }}
        >
          한 줄 소개
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 2,
            bgcolor: themeColors.cardBg,
            borderRadius: 2,
            boxShadow:
              theme.palette.mode === "light"
                ? "0 2px 12px rgba(0,0,0,0.04)"
                : "0 2px 12px rgba(0,0,0,0.2)",
            border:
              theme.palette.mode === "dark"
                ? `1px solid ${themeColors.border}`
                : "none",
          }}
        >
          <Box display="flex" justifyContent="center" p={2}>
            <CircularProgress size={24} />
          </Box>
        </Paper>
      </>
    );
  }

  return (
    <>
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ mb: 2, display: "flex", alignItems: "center" }}
      >
        한 줄 소개
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 2,
          bgcolor: themeColors.cardBg,
          borderRadius: 2,
          boxShadow:
            theme.palette.mode === "light"
              ? "0 2px 12px rgba(0,0,0,0.04)"
              : "0 2px 12px rgba(0,0,0,0.2)",
          border:
            theme.palette.mode === "dark"
              ? `1px solid ${themeColors.border}`
              : "none",
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          {editing ? (
            <>
              <TextField
                variant="standard"
                fullWidth
                value={selfIntro}
                onChange={(e) => setSelfIntro(e.target.value)}
                inputProps={{ maxLength: MAX_LENGTH }}
                helperText={`${selfIntro.length} / ${MAX_LENGTH}자`}
                autoFocus
              />
              <Tooltip title="저장">
                <span>
                  <IconButton
                    onClick={handleSave}
                    disabled={saving || selfIntro.length === 0}
                  >
                    {saving ? <CircularProgress size={20} /> : <Check />}
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="닫기">
                <span>
                  <IconButton onClick={handleClear} disabled={saving}>
                    <Close />
                  </IconButton>
                </span>
              </Tooltip>
            </>
          ) : (
            <>
              <Typography
                variant="body2"
                sx={{ color: themeColors.textSecondary, flexGrow: 1 }}
              >
                {selfIntro || "아직 작성된 소개가 없습니다."}
              </Typography>
              <Tooltip title="편집">
                <IconButton onClick={() => setEditing(true)}>
                  <Edit />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      </Paper>
    </>
  );
};

export default SelfIntroduction;
