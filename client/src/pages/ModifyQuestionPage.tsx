// 2. 컨텐츠 데이터 수정 반영되는지 확인
// 3. 백엔드 UPDATE API 개발

import { useParams } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
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

interface Question {
  id: number;
  title: string;
  content: string;
  tags: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const ModifyQuestionPage = () => {
  const theme = useTheme();
  const mainColor = "#b8dae1";
  const isDarkMode = theme.palette.mode === "dark";
  const { id } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  // 기존 코드에 추가
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 데이터 로드 후 상태 초기화 (기존 useEffect 수정)
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:3000/questions/${id}`);
        if (!response.ok) throw new Error("질문을 불러올 수 없습니다.");
        const data = await response.json();
        setQuestion(data);

        // 🔥 추가: 데이터 로드 후 폼 상태 초기화
        setTitle(data.title);
        setContent(data.content);
        setTags(data.tags);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  // 🔥 새로 추가할 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:3000/questions/modify/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            tags,
          }),
        }
      );

      if (!response.ok) throw new Error("질문 수정에 실패했습니다.");

      alert("질문이 성공적으로 수정되었습니다!");
      // 필요시 페이지 이동 로직 추가
    } catch (error) {
      console.error(error);
      alert("질문 수정 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTags(input.split(",").map((tag) => tag.trim()));
  };

  console.log("로딩 여부 확인: ", loading);
  console.log("modify page에서 단일 question 확인: ", question);
  console.log("변경 후 데이터", {
    title,
    content,
    tags,
  });
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
                    // label="질문의 제목을 입력하세요"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
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
                        // ref={quillRef}
                        value={content}
                        onChange={setContent}
                        // modules={modules}
                        theme="snow"
                        placeholder="질문 내용을 자세히 작성하세요..."
                        style={{ borderRadius: "8px", marginBottom: "20px" }}
                      />
                    </Suspense>
                  </Box>

                  {/* Preview Section - Only visible when there's content */}
                  {/* {content && (
                    <Box
                      sx={{
                        mt: 4,
                        p: 3,
                        borderRadius: "12px",
                        backgroundColor: isDarkMode
                          ? alpha("#fff", 0.03)
                          : alpha("#f9f9f9", 0.7),
                        border: `1px solid ${
                          isDarkMode ? alpha("#fff", 0.1) : alpha("#000", 0.1)
                        }`,
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          color: mainColor,
                          mb: 2,
                          display: "flex",
                          alignItems: "center",
                          "&::before": {
                            content: '""',
                            display: "inline-block",
                            width: "3px",
                            height: "14px",
                            borderRadius: "2px",
                            marginRight: "8px",
                            background: `linear-gradient(to bottom, ${mainColor}, #ccaee3)`,
                          },
                        }}
                      >
                        미리보기
                      </Typography>
                      <div
                        className="ql-editor"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(content),
                        }}
                        style={{
                          overflow: "hidden",
                          whiteSpace: "pre-wrap",
                          maxHeight: "300px",
                          overflowY: "auto",
                          padding: "8px",
                          borderRadius: "8px",
                          backgroundColor: isDarkMode
                            ? alpha("#fff", 0.01)
                            : alpha("#fff", 0.5),
                        }}
                      />
                    </Box>
                  )} */}
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

                  {/* {tags.length > 0 && (
                    <Box
                      sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}
                    >
                      {tags.map(
                        (tag, index) =>
                          tag && (
                            <Chip
                              key={index}
                              label={tag}
                              sx={{
                                backgroundColor: isDarkMode
                                  ? alpha(mainColor, 0.15)
                                  : alpha(mainColor, 0.08),
                                color: isDarkMode
                                  ? alpha("#fff", 0.9)
                                  : alpha("#000", 0.8),
                                borderRadius: "8px",
                                fontWeight: 500,
                                border: `1px solid ${
                                  isDarkMode
                                    ? alpha(mainColor, 0.3)
                                    : alpha(mainColor, 0.2)
                                }`,
                                transition: "all 0.2s ease",
                                "&:hover": {
                                  backgroundColor: isDarkMode
                                    ? alpha(mainColor, 0.25)
                                    : alpha(mainColor, 0.15),
                                  boxShadow: `0 2px 5px ${alpha(
                                    mainColor,
                                    0.2
                                  )}`,
                                },
                              }}
                            />
                          )
                      )}
                    </Box>
                  )} */}
                </Box>
                {/* buttons */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 4,
                    flexDirection: { xs: "column", sm: "row" },
                    gap: { xs: 2, sm: 0 },
                  }}
                >
                  {/* preview button */}
                  <Box display="flex" justifyContent="flex-start">
                    <Button
                      variant="outlined"
                      //   onClick={() => setPreviewMode(!previewMode)}
                      //   startIcon={
                      //     previewMode ? <VisibilityOffIcon /> : <VisibilityIcon />
                      //   }
                      sx={{
                        border: `1px solid ${alpha(mainColor, 0.5)}`,
                        color: mainColor,
                        backgroundColor: isDarkMode
                          ? alpha("#fff", 0.05)
                          : alpha(mainColor, 0.05),
                        borderRadius: "10px",
                        padding: "8px 16px",
                        textTransform: "none",
                        fontWeight: 600,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: isDarkMode
                            ? alpha(mainColor, 0.15)
                            : alpha(mainColor, 0.1),
                          borderColor: mainColor,
                          boxShadow: `0 2px 8px ${alpha(mainColor, 0.2)}`,
                        },
                      }}
                    >
                      {/* {previewMode ? "편집 모드" : "미리보기"} */}
                      미리보기
                    </Button>
                  </Box>
                  {/* submit button */}
                  <Box>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting} // ✅ 로딩 상태 연결
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
