import { convertMarkdownToHtml } from "@domains/detail/utils/markdownUtils";
import { AnswerContentProps } from "@domains/detail/types";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"; // 하이라이트 스타일 import

function AnswerContent({ answer }: AnswerContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    setHtmlContent(convertMarkdownToHtml(answer.content));
  }, [answer.content]);

  useEffect(() => {
    if (!contentRef.current) return;

    const codeBlocks = contentRef.current.querySelectorAll("pre code");

    codeBlocks.forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [htmlContent]);

  const getContentStyles = () => ({
    "& pre": {
      backgroundColor: "#282c34",
      color: "#abb2bf",
      borderRadius: "6px",
      padding: "16px",
      fontSize: "13.5px",
      fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
      overflowX: "auto",
      marginBottom: "14px",
    },
    "& code": {
      fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
    },
  });

  return (
    <Box
      ref={contentRef}
      sx={getContentStyles()}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export default AnswerContent;
