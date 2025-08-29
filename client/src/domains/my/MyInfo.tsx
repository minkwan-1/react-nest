import React from "react";
import { Avatar, Typography, Badge, Tooltip, Box } from "@mui/material";
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
                color: "#b8dae1",
                width: 24,
                height: 24,
                padding: "2px",
              }}
            />
          </Tooltip>
        }
      >
        <Avatar
          alt={userInfo?.user.name || ""}
          src={avatarUrl}
          sx={{
            width: 120,
            height: 120,
            mb: 2,
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
        }}
      >
        {nickname && nickname.trim() ? (
          nickname
        ) : (
          <Box
            component="span"
            sx={{
              fontStyle: "italic",
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
