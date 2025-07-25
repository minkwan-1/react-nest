import { convertMarkdownToHtml } from "@components/detail/utils/markdownUtils";
import { themeColors } from "../../utils/styleUtils";
import { AnswerContentProps } from "@components/detail/types";
import { Box } from "@mui/material";

function AnswerContent({ answer }: AnswerContentProps) {
  const getContentStyles = (isAiAnswer?: boolean) => ({
    fontSize: "14.5px",
    lineHeight: 1.6,
    color: themeColors.textPrimary,
    "& h1, & h2, & h3": {
      fontSize: "18px",
      fontWeight: 600,
      marginTop: "20px",
      marginBottom: "12px",
      color: isAiAnswer ? themeColors.ai.primary : themeColors.user.primary,
    },
    "& p": {
      marginBottom: "14px",
    },
    "& ul, & ol": {
      paddingLeft: "20px",
      marginBottom: "14px",
    },
    "& li": {
      marginBottom: "6px",
    },
    "& pre": {
      backgroundColor: themeColors.code.bg,
      borderRadius: "6px",
      padding: "12px",
      fontSize: "13px",
      fontFamily: "monospace",
      overflowX: "auto",
      border: `1px solid ${themeColors.code.border}`,
      marginBottom: "14px",
    },
    "& code": {
      backgroundColor: themeColors.code.bg,
      padding: "2px 6px",
      borderRadius: "4px",
      fontSize: "13px",
      fontFamily: "monospace",
      border: `1px solid ${themeColors.code.border}`,
    },
    "& pre code": {
      backgroundColor: "transparent",
      padding: 0,
      border: "none",
    },
    "& blockquote": {
      borderLeft: `3px solid ${
        isAiAnswer ? themeColors.ai.primary : themeColors.user.primary
      }`,
      paddingLeft: "16px",
      fontStyle: "italic",
      color: themeColors.textSecondary,
      backgroundColor: isAiAnswer
        ? "rgba(133,193,204,0.05)"
        : "rgba(168,209,219,0.05)",
      margin: "16px 0",
    },
    "& img": {
      maxWidth: "100%",
      borderRadius: "8px",
      margin: "16px 0",
      border: `1px solid ${themeColors.borderLight}`,
    },
    "& table": {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "13px",
      marginBottom: "16px",
      border: `1px solid ${themeColors.borderLight}`,
    },
    "& th, & td": {
      border: `1px solid ${themeColors.borderLight}`,
      padding: "10px 12px",
      textAlign: "left",
    },
    "& th": {
      backgroundColor: isAiAnswer
        ? themeColors.ai.light
        : themeColors.user.light,
      fontWeight: 600,
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
}

export default AnswerContent;
