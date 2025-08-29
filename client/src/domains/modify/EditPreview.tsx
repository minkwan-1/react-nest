import {
  Box,
  Paper,
  Dialog,
  DialogContent,
  Typography,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef } from "react";
import hljs from "highlight.js";

interface EditPreviewProps {
  isPreviewOpen: boolean;
  handlePreviewClose: () => void;
  title: string;
  content: string;
  tags: string[];
  createdDate: string | undefined;
  author: string | undefined;
  authorProfileImage: string | undefined;
}

const EditPreview: React.FC<EditPreviewProps> = ({
  isPreviewOpen,
  handlePreviewClose,
  title,
  content,
  tags,
  createdDate,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const applyHighlighting = () => {
    const container = contentRef.current;
    if (!container) return;

    container.querySelectorAll("pre.ql-syntax").forEach((pre) => {
      console.log("Processing ql-syntax pre element");

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = pre.innerHTML;
      const cleanText = tempDiv.textContent || tempDiv.innerText || "";

      pre.innerHTML = "";
      pre.className = "";

      const code = document.createElement("code");
      code.className = "language-javascript";
      code.textContent = cleanText;
      pre.appendChild(code);
    });

    container.querySelectorAll("pre").forEach((pre) => {
      if (!pre.querySelector("code")) {
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
    if (isPreviewOpen && content) {
      const timer = setTimeout(() => {
        applyHighlighting();
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [content, isPreviewOpen]);

  const formattedDate = createdDate
    ? new Date(createdDate).toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    : "";

  return (
    <Dialog
      open={isPreviewOpen}
      maxWidth="md"
      fullWidth
      onTransitionEnd={() => {
        if (isPreviewOpen) {
          applyHighlighting();
        }
      }}
    >
      <IconButton
        aria-label="close"
        onClick={handlePreviewClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Box
          sx={{
            padding: "0 0 24px",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            {title}
          </Typography>

          <Stack
            direction="row"
            spacing={3}
            sx={{
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body2">{formattedDate}</Typography>
            </Box>
          </Stack>
          <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  borderRadius: "4px",
                }}
              />
            ))}
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Paper
            elevation={0}
            sx={{
              overflowX: "auto",
              p: 3,
              borderRadius: 2,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              "& .question-content p": {
                mb: 2,
                color: "text.primary",
                lineHeight: 1.7,
              },
              "& .question-content ul, & .question-content ol": {
                pl: 3,
                mb: 2,
                "& li": {
                  mb: 1,
                },
              },
              "& .question-content strong": {
                color: "primary.dark",
                fontWeight: 600,
              },
              "& .question-content img": {
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                my: 1,
                border: "1px solid",
                borderColor: "divider",
              },

              "& pre code": {
                backgroundColor: "#1e1e1e",
                color: "#dcdcdc",
                display: "block",
                overflowX: "auto",
                padding: "1rem",
                borderRadius: "8px",
              },
            }}
          >
            <div
              ref={contentRef}
              className="question-content"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </Paper>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditPreview;
