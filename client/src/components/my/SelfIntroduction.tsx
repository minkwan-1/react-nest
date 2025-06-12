import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  useTheme,
  TextField,
  IconButton,
  Box,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { Edit, Check, Close } from "@mui/icons-material";
import axios from "axios";
import { realUserInfo } from "@atom/auth";
import { useAtom } from "jotai";

const MAX_LENGTH = 80; // 한 줄 소개 최대 글자 수

const SelfIntroduction = () => {
  const theme = useTheme();

  // 🔹 상태 선언
  const [selfIntro, setSelfIntro] = useState(""); // 자기소개 텍스트 상태
  const [editing, setEditing] = useState(false); // 편집 모드 여부
  const [loading, setLoading] = useState(true); // 초기 로딩 상태
  const [saving, setSaving] = useState(false); // 저장 중 여부
  const [user] = useAtom(realUserInfo); // 사용자 정보 (jotai atom 사용)

  console.log(user); // 사용자 정보 콘솔 출력 (디버깅용)

  // 🔹 컴포넌트 마운트 시 자기소개 데이터 불러오기
  useEffect(() => {
    const fetchSelfIntro = async () => {
      try {
        const res = await axios.get("/api/user/self-intro"); // API 호출
        setSelfIntro(res.data.selfIntro || ""); // 결과가 없을 경우 빈 문자열로 설정
      } catch (error) {
        console.error("소개 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSelfIntro();
  }, []);

  // 🔹 저장 처리
  const handleSave = async () => {
    if (selfIntro.length > MAX_LENGTH) return; // 최대 길이 초과 방지
    setSaving(true);
    try {
      await axios.put("/api/user/self-intro", { selfIntro }); // API 저장 요청
      setEditing(false); // 저장 후 편집 종료
    } catch (error) {
      console.error("소개 저장 실패:", error);
    } finally {
      setSaving(false);
    }
  };

  // 🔹 초기화 및 편집 종료 처리
  const handleClear = () => {
    setSelfIntro(""); // 입력 값 초기화
    setEditing(false); // 편집 모드 종료
  };

  // 🔹 테마에 따라 색상 구성
  const themeColors = {
    cardBg: theme.palette.background.paper,
    border: theme.palette.mode === "light" ? "#e0e0e0" : "#333333",
    textSecondary: theme.palette.text.secondary,
  };

  return (
    <>
      {/* 🔹 제목 */}
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ mb: 2, display: "flex", alignItems: "center" }}
      >
        한 줄 소개
      </Typography>

      {/* 🔹 카드 UI */}
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
        {/* 🔹 로딩 상태 */}
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <Box display="flex" alignItems="center" gap={1}>
            {/* 🔹 편집 모드 */}
            {editing ? (
              <>
                <TextField
                  variant="standard"
                  fullWidth
                  value={selfIntro}
                  onChange={(e) => setSelfIntro(e.target.value)}
                  inputProps={{ maxLength: MAX_LENGTH }}
                  helperText={`${selfIntro.length} / ${MAX_LENGTH}자`}
                />
                {/* 저장 버튼 */}
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
                {/* 초기화 버튼 */}
                <Tooltip title="초기화 후 닫기">
                  <span>
                    <IconButton onClick={handleClear} disabled={saving}>
                      <Close />
                    </IconButton>
                  </span>
                </Tooltip>
              </>
            ) : (
              <>
                {/* 🔹 읽기 모드 텍스트 출력 */}
                <Typography
                  variant="body2"
                  sx={{ color: themeColors.textSecondary, flexGrow: 1 }}
                >
                  {selfIntro || "아직 작성된 소개가 없습니다."}
                </Typography>
                {/* 편집 버튼 */}
                <Tooltip title="편집">
                  <IconButton onClick={() => setEditing(true)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
        )}
      </Paper>
    </>
  );
};

export default SelfIntroduction;
