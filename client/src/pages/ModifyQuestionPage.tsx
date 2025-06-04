// import { useParams } from "react-router-dom";
import { PageContainer, ComponentWrapper } from "@components/layout/common";
import {
  Box,
  Container,
  Paper,
  alpha,
  useTheme,
  Typography,
  TextField,
} from "@mui/material";
import { BackgroundElements, PageHeader } from "@components/modify";

const ModifyQuestionPage = () => {
  //   const { id } = useParams();
  const theme = useTheme();
  const mainColor = "#b8dae1";
  const isDarkMode = theme.palette.mode === "dark";

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
              <form>
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
                    label="질문의 제목을 입력하세요"
                    fullWidth
                    // value={title}
                    // onChange={(e) => setTitle(e.target.value)}
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
              </form>
            </Paper>
          </Box>
        </Container>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default ModifyQuestionPage;
