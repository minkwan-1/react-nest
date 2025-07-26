import React from "react";
import {
  Avatar,
  Typography,
  Badge,
  Tooltip,
  useTheme,
  Box,
} from "@mui/material";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";

import { Verified as VerifiedIcon } from "@mui/icons-material";

import { useUserQuestions } from "./hooks/useUserQuestions";

interface MyInfoProps {
  avatarUrl?: string;
  reputation?: number;
  badges?: string[];
  nickname?: string;
}

const MyInfo: React.FC<MyInfoProps> = ({ avatarUrl, nickname }) => {
  const theme = useTheme();
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
  const [userInfo] = useAtom(realUserInfo);

  useUserQuestions();

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

      <Typography
        variant="body2"
        sx={{
          mb: 2,
          height: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: themeColors.textSecondary,
        }}
      >
        {nickname && nickname.trim() ? (
          nickname
        ) : (
          <Box
            component="span"
            sx={{
              fontStyle: "italic",
              color: theme.palette.text.disabled,
            }}
          >
            닉네임을 추가해 보세요.
          </Box>
        )}
      </Typography>
    </>
  );
};

export default MyInfo;
