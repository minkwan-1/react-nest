import { convertMarkdownToHtml } from "@domains/detail/utils/markdownUtils";
import { themeColors } from "../../utils/styleUtils";
import { AnswerContentProps } from "@domains/detail/types";
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

function AnswerContent({ answer }: AnswerContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const codeBlocks = contentRef.current.querySelectorAll("pre code");
      codeBlocks.forEach((block) => {
        if (!block.classList.contains("hljs")) {
          hljs.highlightElement(block as HTMLElement);
        }
      });
    }
  }, [answer.content]);

  const getContentStyles = () => ({
    fontSize: "14.5px",
    lineHeight: 1.6,
    "& h1, & h2, & h3": {
      fontSize: "18px",
      fontWeight: 600,
      marginTop: "20px",
      marginBottom: "12px",
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
      backgroundColor: "#282c34",
      borderRadius: "6px",
      padding: "16px",
      fontSize: "13.5px",
      fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
      overflowX: "auto",
      marginBottom: "14px",
      color: "#abb2bf",
      "& code.hljs": {
        backgroundColor: "transparent",
        padding: 0,
        border: "none",
        color: "inherit",
      },
    },
    "& code:not(.hljs)": {
      padding: "2px 6px",
      borderRadius: "4px",
      fontSize: "13px",
      fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
    },
    "& blockquote": {
      paddingLeft: "16px",
      fontStyle: "italic",
      color: themeColors.textSecondary,
      backgroundColor: "rgba(133, 193, 204, 0.05)",
      margin: "16px 0",
    },

    "& table": {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "13px",
      marginBottom: "16px",
    },
    "& th, & td": {
      padding: "10px 12px",
      textAlign: "left",
    },
    "& th": {
      fontWeight: 600,
    },
    "& a": {
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
      ref={contentRef}
      sx={getContentStyles()}
      dangerouslySetInnerHTML={{
        __html: convertMarkdownToHtml(answer.content),
      }}
    />
  );
}

export default AnswerContent;
