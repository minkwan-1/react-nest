import {
  Box,
  Paper,
  Dialog,
  DialogContent,
  Typography,
  Stack,
  Chip,
  IconButton,
  Avatar,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";

interface PreviewDialogProps {
  isPreviewOpen: boolean;
  handlePreviewClose: () => void;
  title: string;
  content: string;
}

const PreviewDialog: React.FC<PreviewDialogProps> = ({
  isPreviewOpen,
  handlePreviewClose,
  title,
  content,
}) => {
  console.log(title);
  return (
    <Dialog open={isPreviewOpen} maxWidth="md" fullWidth>
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
            flex: 1.5,
            pr: { xs: "0", sm: "0", md: "2" },
            overflowY: "auto",
            height: "100%",
          }}
        >
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
                <Typography variant="body2">
                  {/* 실제 데이터로 교체 필요 */}
                  2025년 8월 8일 오후 05:27
                </Typography>
              </Box>
            </Stack>
            <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {/* Chip - 실제 데이터로 교체 필요 */}
              <Chip
                label="React"
                size="small"
                sx={{
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  borderRadius: "4px",
                }}
              />
              <Chip
                label="Tanstack-Query"
                size="small"
                sx={{
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  borderRadius: "4px",
                }}
              />
              <Chip
                label="Data-Fetching"
                size="small"
                sx={{
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  borderRadius: "4px",
                }}
              />
            </Box>
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
              "& .question-content code": {
                fontFamily: "monospace",
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "grey.800" : "grey.100",
                padding: "2px 6px",
                borderRadius: "4px",
                fontSize: "0.9em",
                color: "text.secondary",
                border: "1px solid",
                borderColor: "divider",
              },

              "& .question-content img": {
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                my: 1,
                border: "1px solid",
                borderColor: "divider",
              },
            }}
          >
            {/* __html - 실제 데이터로 교체 필요 */}
            <div
              className="question-content"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </Paper>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                backgroundColor: "background.default",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  mr: 1,
                  bgcolor: "b8dae1",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {/* 실제 데이터로 교체 필요 */}
                K.W
              </Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {/* 실제 데이터로 교체 필요 */}
                  김철수
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", display: "block" }}
                >
                  작성자
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialog;
