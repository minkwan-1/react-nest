import { useParams } from "react-router-dom";
import { Suspense } from "react";
import ReactQuill from "react-quill";
import { PageContainer, ComponentWrapper } from "@components/layout/common";
import {
  Box,
  Container,
  Paper,
  alpha,
  useTheme,
  Typography,
  TextField,
  CircularProgress,
  Button,
} from "@mui/material";
import { BackgroundElements, PageHeader } from "@components/modify";
import { useModifyQuestion } from "@components/modify/hooks/useModifyQuestion";

const ModifyQuestionPage = () => {
  const theme = useTheme();
  const mainColor = "#b8dae1";
  const isDarkMode = theme.palette.mode === "dark";
  const { id } = useParams();

  // 커스텀 훅 사용
  const {
    question,
    loading,
    isSubmitting,
    title,
    content,
    tags,
    setTitle,
    setContent,
    handleTagsChange,
    handleSubmit,
    isFormValid,
  } = useModifyQuestion({ questionId: id });

  console.log("로딩 여부 확인: ", loading);
  console.log("modify page에서 단일 question 확인: ", question);
  console.log("변경 후 데이터", { title, content, tags });

  // 로딩 중일 때
  if (loading) {
    return (
      <PageContainer>
        <ComponentWrapper>
          <Container maxWidth="lg" disableGutters>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50vh",
              }}
            >
              <CircularProgress size={40} sx={{ color: mainColor }} />
              <Typography
                sx={{
                  ml: 2,
                  color: isDarkMode ? alpha("#fff", 0.7) : alpha("#000", 0.6),
                }}
              >
                질문을 불러오는 중...
              </Typography>
            </Box>
          </Container>
        </ComponentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ComponentWrapper>
        <Container maxWidth="lg" disableGutters>
          <Box
            sx={{
              position: "relative",
              padding: { xs: 2, sm: 3 },
              maxWidth: 1200,
              mx: "auto",
              zIndex: 1,
            }}
          >
            {/* background element */}
            <BackgroundElements mainColor={mainColor} />

            {/* page header */}
            <PageHeader
              title="질문 수정하기"
              subtitle="질문을 더 명확하게 다듬어 커뮤니티의 도움을 받아보세요."
              mainColor={mainColor}
            />

            {/* question form */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: "16px",
                backgroundColor: isDarkMode ? alpha("#222", 0.7) : "#ffffff",
                boxShadow: isDarkMode
                  ? "0 8px 20px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset"
                  : "0 8px 30px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.02) inset",
                backdropFilter: "blur(10px)",
                padding: { xs: 2, sm: 4 },
                overflow: "hidden",
              }}
            >
              <form onSubmit={handleSubmit}>
                {/* title area */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1.5,
                      fontWeight: 600,
                      color: isDarkMode ? "#fff" : "#333",
                      display: "flex",
                      alignItems: "center",
                      "&::before": {
                        content: '""',
                        display: "inline-block",
                        width: "4px",
                        height: "16px",
                        borderRadius: "2px",
                        marginRight: "10px",
                        background: `linear-gradient(to bottom, ${mainColor}, #ccaee3)`,
                      },
                    }}
                  >
                    제목
                  </Typography>
                  <TextField
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="질문의 제목을 입력하세요"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        backgroundColor: isDarkMode
                          ? alpha("#fff", 0.05)
                          : alpha("#f5f5f5", 0.7),
                        "& fieldset": {
                          borderColor: isDarkMode
                            ? alpha("#fff", 0.1)
                            : alpha("#000", 0.1),
                          transition: "border-color 0.2s ease",
                        },
                        "&:hover fieldset": {
                          borderColor: mainColor,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: mainColor,
                          borderWidth: "2px",
                        },
                      },
                      "& .MuiInputBase-input": {
                        padding: "14px 16px",
                      },
                    }}
                  />
                </Box>

                {/* content */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1.5,
                      fontWeight: 600,
                      color: isDarkMode ? "#fff" : "#333",
                      display: "flex",
                      alignItems: "center",
                      "&::before": {
                        content: '""',
                        display: "inline-block",
                        width: "4px",
                        height: "16px",
                        borderRadius: "2px",
                        marginRight: "10px",
                        background: `linear-gradient(to bottom, ${mainColor}, #ccaee3)`,
                      },
                    }}
                  >
                    질문 내용
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      color: isDarkMode
                        ? alpha("#fff", 0.6)
                        : alpha("#000", 0.6),
                      fontSize: "14px",
                    }}
                  >
                    문제 상황, 시도한 방법, 예상 결과 등을 상세히 설명해주세요
                  </Typography>

                  {/* Editor style wrapper */}
                  <Box
                    sx={{
                      ".ql-toolbar": {
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "8px",
                        backgroundColor: isDarkMode
                          ? alpha("#fff", 0.05)
                          : "#f5f5f5",
                        border: `1px solid ${
                          isDarkMode ? alpha("#fff", 0.1) : alpha("#000", 0.1)
                        }`,
                        borderBottom: "none",
                      },
                      ".ql-container": {
                        borderBottomLeftRadius: "8px",
                        borderBottomRightRadius: "8px",
                        backgroundColor: isDarkMode
                          ? alpha("#fff", 0.03)
                          : "#fff",
                        border: `1px solid ${
                          isDarkMode ? alpha("#fff", 0.1) : alpha("#000", 0.1)
                        }`,
                        maxHeight: "400px",
                        minHeight: "200px",
                      },
                      ".ql-editor": {
                        minHeight: "200px",
                        maxHeight: "400px",
                        overflow: "auto",
                      },
                      ".ql-picker": {
                        color: isDarkMode ? "#ddd" : "#444",
                      },
                      ".ql-picker-options": {
                        backgroundColor: isDarkMode ? "#333" : "#fff",
                        border: `1px solid ${
                          isDarkMode ? alpha("#fff", 0.1) : alpha("#000", 0.1)
                        }`,
                      },
                      ".ql-stroke": {
                        stroke: isDarkMode ? "#ddd" : "#444",
                      },
                      ".ql-fill": {
                        fill: isDarkMode ? "#ddd" : "#444",
                      },
                      ".ql-picker-label": {
                        color: isDarkMode ? "#ddd" : "#444",
                      },
                      ".ql-picker-item": {
                        color: isDarkMode ? "#ddd" : "#444",
                      },
                      ".ql-active": {
                        color: `${mainColor} !important`,
                        ".ql-stroke": {
                          stroke: `${mainColor} !important`,
                        },
                        ".ql-fill": {
                          fill: `${mainColor} !important`,
                        },
                      },
                      ".ql-tooltip": {
                        backgroundColor: isDarkMode ? "#333" : "#fff",
                        color: isDarkMode ? "#fff" : "#333",
                        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                        borderRadius: "8px",
                        border: `1px solid ${
                          isDarkMode ? alpha("#fff", 0.1) : alpha("#000", 0.1)
                        }`,
                      },
                      ".ql-tooltip input[type=text]": {
                        backgroundColor: isDarkMode ? "#444" : "#f5f5f5",
                        color: isDarkMode ? "#fff" : "#333",
                        border: `1px solid ${
                          isDarkMode ? alpha("#fff", 0.1) : alpha("#000", 0.1)
                        }`,
                        borderRadius: "4px",
                        padding: "4px 8px",
                      },
                      ".ql-tooltip a.ql-action, .ql-tooltip a.ql-remove": {
                        color: mainColor,
                      },
                    }}
                  >
                    <Suspense
                      fallback={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "200px",
                            backgroundColor: isDarkMode
                              ? alpha("#fff", 0.03)
                              : "#fff",
                            border: `1px solid ${
                              isDarkMode
                                ? alpha("#fff", 0.1)
                                : alpha("#000", 0.1)
                            }`,
                            borderRadius: "8px",
                          }}
                        >
                          <CircularProgress
                            size={40}
                            sx={{ color: mainColor }}
                          />
                          <Typography
                            sx={{
                              ml: 2,
                              color: isDarkMode
                                ? alpha("#fff", 0.7)
                                : alpha("#000", 0.6),
                            }}
                          >
                            에디터 로딩 중...
                          </Typography>
                        </Box>
                      }
                    >
                      <ReactQuill
                        value={content}
                        onChange={setContent}
                        theme="snow"
                        placeholder="질문 내용을 자세히 작성하세요..."
                        style={{ borderRadius: "8px", marginBottom: "20px" }}
                      />
                    </Suspense>
                  </Box>
                </Box>

                {/* tags */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1.5,
                      fontWeight: 600,
                      color: isDarkMode ? "#fff" : "#333",
                      display: "flex",
                      alignItems: "center",
                      "&::before": {
                        content: '""',
                        display: "inline-block",
                        width: "4px",
                        height: "16px",
                        borderRadius: "2px",
                        marginRight: "10px",
                        background: `linear-gradient(to bottom, ${mainColor}, #ccaee3)`,
                      },
                    }}
                  >
                    태그
                  </Typography>

                  <TextField
                    label="태그 (쉼표로 구분)"
                    fullWidth
                    value={tags.join(", ")}
                    onChange={handleTagsChange}
                    helperText="태그를 쉼표(,)로 구분하여 입력하세요"
                    FormHelperTextProps={{
                      sx: {
                        color: isDarkMode
                          ? alpha("#fff", 0.5)
                          : alpha("#000", 0.6),
                        fontSize: "12px",
                        mt: 1,
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        backgroundColor: isDarkMode
                          ? alpha("#fff", 0.05)
                          : alpha("#f5f5f5", 0.7),
                        "& fieldset": {
                          borderColor: isDarkMode
                            ? alpha("#fff", 0.1)
                            : alpha("#000", 0.1),
                          transition: "border-color 0.2s ease",
                        },
                        "&:hover fieldset": {
                          borderColor: mainColor,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: mainColor,
                          borderWidth: "2px",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: isDarkMode
                          ? alpha("#fff", 0.7)
                          : alpha("#000", 0.6),
                        "&.Mui-focused": {
                          color: mainColor,
                        },
                      },
                      "& .MuiInputBase-input": {
                        padding: "14px 16px",
                      },
                    }}
                  />
                </Box>

                {/* submit button */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    mt: 4,
                    flexDirection: { xs: "column", sm: "row" },
                    gap: { xs: 2, sm: 0 },
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting || !isFormValid}
                    sx={{
                      position: "relative",
                      background: `linear-gradient(135deg, ${mainColor} 0%, #ccaee3 100%)`,
                      color: "white",
                      textTransform: "none",
                      fontWeight: 700,
                      padding: "10px 24px",
                      borderRadius: "10px",
                      fontSize: "15px",
                      transition: "all 0.3s ease",
                      boxShadow: `0 4px 12px ${alpha(mainColor, 0.3)}`,
                      "&:hover": {
                        background: `linear-gradient(135deg, ${mainColor} 20%, #ccaee3 100%)`,
                        boxShadow: `0 6px 20px ${alpha(mainColor, 0.5)}`,
                        transform: "translateY(-2px)",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                        boxShadow: `0 2px 8px ${alpha(mainColor, 0.3)}`,
                      },
                      "&.Mui-disabled": {
                        background: `linear-gradient(135deg, ${mainColor} 0%, #ccaee3 100%)`,
                        opacity: 0.7,
                        color: "white",
                      },
                    }}
                  >
                    {isSubmitting ? "수정 중..." : "질문 수정하기"}
                  </Button>
                </Box>
              </form>
            </Paper>
          </Box>
        </Container>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default ModifyQuestionPage;
