import { useEffect, useRef } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  Chip,
  IconButton,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import hljs from "highlight.js";

interface PreviewDialogProps {
  isPreviewOpen: boolean;
  handlePreviewClose: () => void;
  title: string;
  content: string;
  tags: string[];
  previewDate: Date | null;
}

const PreviewDialog: React.FC<PreviewDialogProps> = ({
  isPreviewOpen,
  handlePreviewClose,
  title,
  content,
  tags,
  previewDate,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const applyHighlighting = () => {
    const container = contentRef.current;
    if (!container) return;

    container.querySelectorAll("pre code").forEach((block) => {
      block.className = block.className.replace(/hljs[^ ]*/g, "");
    });

    container.querySelectorAll("pre.ql-syntax").forEach((pre) => {
      if (!pre.querySelector("code")) {
        const code = document.createElement("code");
        code.className = "language-javascript";
        code.textContent = pre.textContent || "";
        pre.textContent = "";
        pre.appendChild(code);
      }
    });

    container.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  };

  useEffect(() => {
    if (isPreviewOpen && content) {
      const timer = setTimeout(() => {
        applyHighlighting();
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [content, isPreviewOpen]);

  const formattedDate = previewDate
    ? previewDate.toLocaleString("ko-KR", {
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
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        <Typography variant="h4" fontWeight={700} mb={2}>
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2 }}>
          <AccessTimeIcon fontSize="small" />
          <Typography variant="body2">{formattedDate}</Typography>
        </Box>

        <Box sx={{ mb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            overflowX: "auto",
            "& pre code": {
              backgroundColor: "#1e1e1e",
              color: "#dcdcdc",
              display: "block",
              padding: "1rem",
              overflowX: "auto",
              borderRadius: "8px",
            },
          }}
        >
          <div
            ref={contentRef}
            className="question-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialog;
