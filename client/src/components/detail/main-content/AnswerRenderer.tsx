// components/AnswerRenderer.tsx
import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Divider,
} from "@mui/material";

// 유틸리티 함수들
import { formatDate, getUserName } from "../utils/formatUtils";
import { convertMarkdownToHtml } from "../utils/markdownUtils";
import { themeColors, getAvatarColor } from "../utils/styleUtils";
import {
  AnswerRendererProps,
  AnswerCardProps,
  AnswerBadgeProps,
  AnswerHeaderProps,
  AnswerContentProps,
} from "../types";

export const AnswerRenderer: React.FC<AnswerRendererProps> = ({
  aiAnswer,
  answers,
}) => {
  const renderAnswers = () => {
    const allAnswers = [];

    // AI 답변이 있으면 첫 번째로 추가
    if (aiAnswer) {
      allAnswers.push(aiAnswer);
    }

    // 일반 사용자 답변들 추가
    allAnswers.push(...answers);

    return allAnswers.map((answer) => (
      <AnswerCard key={answer.id} answer={answer} />
    ));
  };

  return <>{renderAnswers()}</>;
};

const AnswerCard: React.FC<AnswerCardProps> = ({ answer }) => {
  return (
    <Card
      sx={{
        mb: 3,
        border: answer.isAiAnswer
          ? `2px solid ${themeColors.ai.primary}`
          : `2px solid ${themeColors.user.primary}`,
        borderRadius: 3,
        boxShadow: answer.isAiAnswer
          ? "0 4px 20px rgba(133, 193, 204, 0.2)"
          : "0 4px 20px rgba(168, 209, 219, 0.2)",
        "&:hover": {
          boxShadow: answer.isAiAnswer
            ? "0 8px 25px rgba(133, 193, 204, 0.3)"
            : "0 8px 25px rgba(168, 209, 219, 0.3)",
          transform: "translateY(-2px)",
        },
        position: "relative",
        backgroundColor: answer.isAiAnswer
          ? themeColors.ai.light
          : themeColors.user.light,
        transition: "all 0.3s ease",
      }}
    >
      <AnswerBadge isAiAnswer={answer.isAiAnswer} />

      <CardContent sx={{ p: 4 }}>
        <AnswerHeader answer={answer} />

        <Divider
          sx={{
            mb: 3,
            borderColor: answer.isAiAnswer
              ? themeColors.ai.border
              : themeColors.user.border,
            borderWidth: "1px",
          }}
        />

        <AnswerContent answer={answer} />
      </CardContent>
    </Card>
  );
};

const AnswerBadge: React.FC<AnswerBadgeProps> = ({ isAiAnswer }) => (
  <Box
    sx={{
      position: "absolute",
      top: 16,
      right: 16,
      bgcolor: isAiAnswer ? themeColors.ai.primary : themeColors.user.primary,
      color: "white",
      px: 2,
      py: 0.8,
      borderRadius: 2,
      fontSize: "12px",
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      gap: 0.5,
      zIndex: 1,
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    }}
  >
    {isAiAnswer ? "🤖 AI 답변" : "👤 사용자 답변"}
  </Box>
);

const AnswerHeader: React.FC<AnswerHeaderProps> = ({ answer }) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
    <Avatar
      sx={{
        width: 40,
        height: 40,
        bgcolor: getAvatarColor(answer.userId, answer.isAiAnswer),
        mr: 2.5,
        fontSize: "16px",
        fontWeight: 600,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {answer.isAiAnswer ? "🤖" : getUserName(answer.userId).charAt(0)}
    </Avatar>
    <Box sx={{ flex: 1 }}>
      <Typography
        variant="subtitle1"
        sx={{
          color: answer.isAiAnswer
            ? themeColors.ai.primary
            : themeColors.user.primary,
          fontWeight: 700,
          fontSize: "16px",
        }}
      >
        {getUserName(answer.userId, answer.isAiAnswer)}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: themeColors.textSecondary,
          fontSize: "13px",
          mt: 0.5,
        }}
      >
        {formatDate(answer.createdAt)}
      </Typography>
    </Box>
  </Box>
);

const AnswerContent: React.FC<AnswerContentProps> = ({ answer }) => {
  const getContentStyles = (isAiAnswer?: boolean) => ({
    "& .ql-editor": {
      padding: 0,
      fontSize: "15px",
      lineHeight: 1.7,
      color: themeColors.textPrimary,
    },
    "& .ql-editor p": {
      marginBottom: "16px",
    },
    "& .ql-editor ul, & .ql-editor ol": {
      paddingLeft: "24px",
      marginBottom: "16px",
    },
    "& .ql-editor h1, & .ql-editor h2, & .ql-editor h3": {
      marginBottom: "16px",
      fontWeight: 700,
    },
    "& .ql-editor pre": {
      backgroundColor: themeColors.code.bg,
      border: `2px solid ${themeColors.code.border}`,
      borderRadius: "8px",
      padding: "16px",
      fontSize: "14px",
      fontFamily: "monospace",
      overflow: "auto",
      marginBottom: "16px",
    },
    fontSize: "15px",
    lineHeight: 1.7,
    color: themeColors.textPrimary,
    "& h1, & h2, & h3, & h4, & h5, & h6": {
      marginBottom: "16px",
      marginTop: "20px",
      fontWeight: 700,
      color: isAiAnswer ? themeColors.ai.primary : themeColors.user.primary,
      "&:first-of-type": {
        marginTop: 0,
      },
    },
    "& h1": { fontSize: "26px" },
    "& h2": { fontSize: "22px" },
    "& h3": { fontSize: "19px" },
    "& h4": { fontSize: "17px" },
    "& h5": { fontSize: "15px" },
    "& h6": { fontSize: "14px" },
    "& p": {
      marginBottom: "16px",
      lineHeight: 1.7,
      "&:last-child": {
        marginBottom: 0,
      },
    },
    "& ul, & ol": {
      paddingLeft: "24px",
      marginBottom: "16px",
      "&:last-child": {
        marginBottom: 0,
      },
    },
    "& li": {
      marginBottom: "6px",
      lineHeight: 1.6,
    },
    "& pre": {
      backgroundColor: themeColors.code.bg,
      border: `2px solid ${themeColors.code.border}`,
      borderRadius: "8px",
      padding: "16px",
      fontSize: "14px",
      fontFamily: "'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
      overflow: "auto",
      marginBottom: "16px",
      marginTop: "12px",
      lineHeight: 1.5,
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      "&:last-child": {
        marginBottom: 0,
      },
    },
    "& code": {
      backgroundColor: themeColors.code.bg,
      padding: "3px 8px",
      borderRadius: "6px",
      fontSize: "14px",
      fontFamily: "'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
      color: themeColors.code.text,
      border: `1px solid ${themeColors.code.border}`,
      fontWeight: 500,
    },
    "& pre code": {
      backgroundColor: "transparent",
      padding: 0,
      border: "none",
      color: "inherit",
    },
    "& blockquote": {
      borderLeft: `4px solid ${
        isAiAnswer ? themeColors.ai.primary : themeColors.user.primary
      }`,
      paddingLeft: "20px",
      marginLeft: 0,
      marginBottom: "16px",
      marginTop: "12px",
      color: themeColors.textSecondary,
      fontStyle: "italic",
      backgroundColor: isAiAnswer
        ? "rgba(133, 193, 204, 0.08)"
        : "rgba(168, 209, 219, 0.08)",
      paddingTop: "12px",
      paddingBottom: "12px",
      borderRadius: "0 8px 8px 0",
      fontSize: "14px",
    },
    "& img": {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "12px",
      marginTop: "12px",
      marginBottom: "12px",
      border: `2px solid ${themeColors.borderLight}`,
      display: "block",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    "& table": {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "16px",
      border: `2px solid ${themeColors.borderLight}`,
      fontSize: "14px",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    },
    "& th, & td": {
      border: `1px solid ${themeColors.borderLight}`,
      padding: "12px 16px",
      textAlign: "left",
      lineHeight: 1.5,
    },
    "& th": {
      backgroundColor: isAiAnswer
        ? themeColors.ai.light
        : themeColors.user.light,
      fontWeight: 700,
      color: themeColors.textPrimary,
      fontSize: "13px",
    },
    "& td": {
      backgroundColor: themeColors.background,
    },
    "& strong": {
      fontWeight: 700,
      color: isAiAnswer ? themeColors.ai.primary : themeColors.user.primary,
    },
    "& em": {
      fontStyle: "italic",
      color: themeColors.textSecondary,
    },
    "& hr": {
      border: "none",
      borderTop: `2px solid ${themeColors.borderLight}`,
      margin: "24px 0",
      borderRadius: "1px",
    },
    "& a": {
      color: isAiAnswer ? themeColors.ai.primary : themeColors.user.primary,
      textDecoration: "none",
      fontWeight: 600,
      "&:hover": {
        textDecoration: "underline",
        opacity: 0.8,
      },
    },
  });

  return (
    <Box
      sx={getContentStyles(answer.isAiAnswer)}
      dangerouslySetInnerHTML={{
        __html: answer.isAiAnswer
          ? convertMarkdownToHtml(answer.content)
          : answer.content,
      }}
    />
  );
};
