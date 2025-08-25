import { convertMarkdownToHtml } from "@domains/detail/utils/markdownUtils";
import { AnswerContentProps } from "@domains/detail/types";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js";

function AnswerContent({ answer }: AnswerContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    // 스트리밍 chunk가 들어올 때마다 호출
    setHtmlContent(convertMarkdownToHtml(answer.content));
  }, [answer.content]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.querySelectorAll("pre code").forEach((block) => {
        if (!block.classList.contains("hljs")) {
          hljs.highlightElement(block as HTMLElement);
        }
      });
    }
  }, [htmlContent]); // htmlContent가 바뀔 때만 하이라이팅

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

      "& code": {
        color: "transparent",
        transition: "color 0.3s ease", // 부드럽게 컬러 전환
      },
      "& code.hljs": {
        color: "inherit",
        backgroundColor: "transparent",
        padding: 0,
        border: "none",
      },
      "& .hljs-keyword": { color: "#c678dd" },
      "& .hljs-string": { color: "#98c379" },
      "& .hljs-title.function_": { color: "#61afef" },
      "& .hljs-comment": { color: "#5c6370", fontStyle: "italic" },
    },
    "& code:not(.hljs)": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      padding: "2px 6px",
      borderRadius: "4px",
      fontSize: "13px",
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
