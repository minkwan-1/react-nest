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
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSelfIntro, updateSelfIntro } from "./api/selfIntroApi";

const MAX_LENGTH = 80;

const SelfIntroduction = () => {
  const theme = useTheme();
  const [editing, setEditing] = useState(false);
  const [selfIntro, setSelfIntro] = useState("");
  const [user] = useAtom(realUserInfo);
  const queryClient = useQueryClient();

  // 1. useQuery로 한 줄 소개 데이터 조회
  const { data: fetchedData, isPending: loading } = useQuery({
    queryKey: ["selfIntro", user?.id],
    queryFn: () => fetchSelfIntro(user!.id),
    enabled: !!user?.id,
  });

  // 2. useMutation으로 한 줄 소개 수정 로직 구현
  const { mutate: saveIntro, isPending: saving } = useMutation({
    mutationFn: updateSelfIntro,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["selfIntro", user?.id] });
      setEditing(false);
    },
    onError: (error) => {
      console.error("소개 저장 실패:", error);
      alert("소개 저장에 실패했습니다.");
    },
  });

  // 3. 서버에서 데이터를 가져오면 편집용 로컬 상태에 반영
  useEffect(() => {
    if (!loading && fetchedData) {
      setSelfIntro(fetchedData.selfIntro || "");
    }
  }, [loading, fetchedData]);

  const handleSave = () => {
    if (selfIntro.length > MAX_LENGTH || !user?.id) return;
    saveIntro({ userId: user.id, selfIntro });
  };

  const handleCancel = () => {
    setSelfIntro(fetchedData?.selfIntro || "");
    setEditing(false);
  };

  const themeColors = {
    cardBg: theme.palette.background.paper,
    border: theme.palette.mode === "light" ? "#e0e0e0" : "#333333",
    textSecondary: theme.palette.text.secondary,
  };

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
              <Tooltip title="취소">
                <span>
                  <IconButton onClick={handleCancel} disabled={saving}>
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
                {fetchedData?.selfIntro || "아직 작성된 소개가 없습니다."}
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
