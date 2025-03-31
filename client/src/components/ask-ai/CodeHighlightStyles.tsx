import { Box, alpha, useTheme } from "@mui/material";

const CodeHighlightStyles = () => {
  const theme = useTheme();
  return (
    <Box
      component="style"
      dangerouslySetInnerHTML={{
        __html: `
      .hljs {
        background: ${alpha(theme.palette.common.black, 0.03)};
        border-radius: 8px;
      }
      .hljs-comment, .hljs-quote {
        color: #6a8759;
        font-style: italic;
      }
      .hljs-keyword, .hljs-selector-tag {
        color: #cc7832;
      }
      .hljs-string, .hljs-attribute, .hljs-addition {
        color: #6a8759;
      }
      .hljs-title, .hljs-section {
        color: #ffc66d;
      }
      .hljs-type, .hljs-name, .hljs-selector-id, .hljs-selector-class {
        color: #e8bf6a;
      }
      .hljs-variable, .hljs-template-variable {
        color: #9876aa;
      }
      .hljs-number {
        color: #6897bb;
      }
    `,
      }}
    />
  );
};

export default CodeHighlightStyles;
