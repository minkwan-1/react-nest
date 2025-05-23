import React, { useEffect } from "react";
import axios from "axios";
import {
  Box,
  Avatar,
  Typography,
  Badge,
  Tooltip,
  useTheme,
} from "@mui/material";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";
import { questionsAtom } from "@atom/question";
import { Verified as VerifiedIcon } from "@mui/icons-material";
import { man } from "../../images/index";

interface MyInfoProps {
  avatarUrl?: string;
  reputation?: number;
  badges?: string[];
}

const MyInfo: React.FC<MyInfoProps> = ({
  avatarUrl = man, // man 이미지를 기본값으로 사용
  reputation = 3842,
  badges = [
    "E-커머스 전문가",
    "뉴스레터 마스터",
    "소셜 인플루언서",
    "트렌드 분석가",
  ],
}) => {
  const theme = useTheme();
  const [userInfo] = useAtom(realUserInfo);
  const [questions, setQuestions] = useAtom(questionsAtom);

  // Fetch questions data
  useEffect(() => {
    if (!userInfo?.id) {
      setQuestions([]);
      return;
    }

    const fetchQuestionsByUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/questions/user/${userInfo.id}`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching user's questions:", error);
      }
    };

    fetchQuestionsByUser();
  }, [userInfo, setQuestions]);

  const themeColors = {
    primary: theme.palette.primary.main,
    primaryDark: "#02b676",
    background: theme.palette.mode === "light" ? "#f8f9fa" : "#121212",
    cardBg: theme.palette.background.paper,
    border: theme.palette.mode === "light" ? "#e0e0e0" : "#333333",
    textPrimary: theme.palette.text.primary,
    textSecondary: theme.palette.text.secondary,
    divider: theme.palette.mode === "light" ? "#e0e0e0" : "#424242",
  };

  // Korean content translations
  const koreanContent = {
    followers: "팔로워",
    following: "팔로잉",
  };

  // Use questions data
  const questionData = questions || [];

  return (
    <>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <Tooltip title="인증된 프로필">
            <VerifiedIcon
              sx={{
                backgroundColor: themeColors.cardBg,
                borderRadius: "50%",
                color: "#b8dae1",
                width: 24,
                height: 24,
                padding: "2px",
                border:
                  theme.palette.mode === "dark"
                    ? `2px solid ${themeColors.border}`
                    : "2px solid white",
              }}
            />
          </Tooltip>
        }
      >
        <Avatar
          alt={userInfo?.name || ""}
          src={avatarUrl}
          sx={{
            width: 120,
            height: 120,
            mb: 2,
            border:
              theme.palette.mode === "light"
                ? "4px solid white"
                : `4px solid ${themeColors.cardBg}`,
            boxShadow:
              theme.palette.mode === "light"
                ? "0 2px 8px rgba(0,0,0,0.15)"
                : "0 2px 8px rgba(0,0,0,0.4)",
          }}
        />
      </Badge>

      <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5 }}>
        {userInfo?.name || "minkwan won"}
      </Typography>

      <Typography
        variant="body2"
        sx={{ mb: 2, color: themeColors.textSecondary }}
      >
        Frontend Developer
      </Typography>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          mb: 3,
          color: themeColors.textSecondary,
          gap: 3,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            {reputation > 1000
              ? Math.floor(reputation / 100) / 10 + "K"
              : reputation}
          </Typography>
          <Typography variant="caption">{koreanContent.followers}</Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            {badges.length * 12}
          </Typography>
          <Typography variant="caption">{koreanContent.following}</Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            {questionData.length}
          </Typography>
          <Typography variant="caption">글</Typography>
        </Box>
      </Box>
    </>
  );
};

export default MyInfo;
