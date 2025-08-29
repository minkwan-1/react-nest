import { convertMarkdownToHtml } from "@domains/detail/utils/markdownUtils";
import { AnswerContentProps } from "@domains/detail/types";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js";

function AnswerContent({ answer }: AnswerContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const html = convertMarkdownToHtml(answer.content);
    setHtmlContent(html);
  }, [answer.content]);

  const applyHighlighting = () => {
    const container = contentRef.current;
    if (!container) return;

    container.querySelectorAll("pre.ql-syntax").forEach((pre) => {
      console.log("Processing ql-syntax pre element");
      console.log("Original innerHTML:", pre.innerHTML);

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = pre.innerHTML;
      const cleanText = tempDiv.textContent || tempDiv.innerText || "";

      console.log("Cleaned text:", cleanText.slice(0, 100));

      pre.innerHTML = "";
      pre.className = "";

      const code = document.createElement("code");
      code.className = "language-javascript";
      code.textContent = cleanText;
      pre.appendChild(code);
    });

    container.querySelectorAll("pre").forEach((pre, index) => {
      if (!pre.querySelector("code")) {
        console.log(`Pre ${index} without code tag, wrapping content`);
        const content = pre.textContent || "";
        pre.innerHTML = "";
        const code = document.createElement("code");
        code.className = "language-javascript";
        code.textContent = content;
        pre.appendChild(code);
      }
    });

    container.querySelectorAll("pre code").forEach((block) => {
      block.className = block.className.replace(/hljs[^ ]*/g, "").trim();
      if (!block.className.includes("language-")) {
        block.className = "language-javascript";
      }
    });

    container.querySelectorAll("pre code").forEach((block, index) => {
      console.log(
        `Highlighting block ${index}:`,
        block.textContent?.slice(0, 50)
      );
      try {
        hljs.highlightElement(block as HTMLElement);
        console.log(`Block ${index} highlighted successfully`);
      } catch (error) {
        console.error(`Error highlighting block ${index}:`, error);
      }
    });
  };

  useEffect(() => {
    if (htmlContent) {
      console.log("HTML content updated, applying highlighting...");

      const timer = setTimeout(() => {
        applyHighlighting();
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [htmlContent]);

  return (
    <Box
      ref={contentRef}
      sx={{
        "& pre code": {
          backgroundColor: "#1e1e1e",
          color: "#dcdcdc",
          display: "block",
          padding: "1rem",
          borderRadius: "8px",
        },
      }}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export default AnswerContent;
