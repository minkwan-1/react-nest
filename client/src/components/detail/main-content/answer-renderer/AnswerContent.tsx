import { convertMarkdownToHtml } from "@components/detail/utils/markdownUtils";
import { themeColors } from "../../utils/styleUtils";
import { AnswerContentProps } from "@components/detail/types";
import { Box } from "@mui/material";

function AnswerContent({ answer }: AnswerContentProps) {
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
}

export default AnswerContent;
