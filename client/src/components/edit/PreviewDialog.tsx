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
}

const PreviewDialog: React.FC<PreviewDialogProps> = ({
  isPreviewOpen,
  handlePreviewClose,
}) => {
  return (
    <Dialog open={isPreviewOpen} maxWidth="md">
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
              Tanstack-Query란?
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
                  2025년 8월 8일 오후 05:27
                </Typography>
              </Box>
            </Stack>
            <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
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
            <div
              className="question-content"
              dangerouslySetInnerHTML={{
                __html:
                  "<p>Tanstack-Query는 데이터 패칭, 캐싱, 동기화, 그리고 서버 상태 관리를 위한 강력한 라이브러리입니다. 특히 React, Vue, Svelte와 같은 UI 프레임워크와 함께 사용될 때 <strong>매우 효과적입니다</strong>.</p><h3>주요 기능</h3><ul><li>자동 캐싱과 데이터 갱신</li><li>백그라운드에서 오래된 데이터 무효화</li><li>손쉬운 Pagination 및 Infinite Scroll 구현</li><li>성능 최적화를 위한 윈도우 포커스 시 재요청</li></ul><p>이러한 기능 덕분에 개발자는 데이터 관리에 들이는 시간을 줄이고, 애플리케이션의 <strong>핵심 비즈니스 로직</strong>에 더 집중할 수 있습니다.</p><code>const { data, isLoading } = useQuery('todos', fetchTodos);</code><p>위 코드는 Tanstack-Query를 사용하여 'todos' 데이터를 가져오는 간단한 예시입니다.</p>",
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
                K.W
              </Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
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
