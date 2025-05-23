import { useState, ChangeEvent } from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  Button,
  alpha,
} from "@mui/material";
import { PageContainer } from "../components/layout/common";
import { TermSection, CheckAgreeSection } from "../components/privacy";
import { termsData } from "../mock";

const TermsAndPrivacyPage = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const mainColor = "#b8dae1";
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const handleAgreeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(event.target.checked);
  };

  const handleSubmit = () => {
    if (isAgreed) {
      alert("약관에 동의하셨습니다.");
    } else {
      alert("약관에 동의해야 합니다.");
    }
  };

  return (
    <PageContainer>
      <Container maxWidth="md">
        <Box
          sx={{
            marginTop: "100px",
            marginBottom: "100px",
            padding: { xs: "20px", sm: "40px" },
            borderRadius: "24px",
            backgroundColor: isDarkMode ? alpha("#222", 0.8) : "#ffffff",
            boxShadow: isDarkMode
              ? "0 10px 30px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset"
              : "0 10px 40px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.02) inset",
            position: "relative",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Background styling elements */}
          <Box
            sx={{
              position: "absolute",
              width: "350px",
              height: "350px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${alpha(
                mainColor,
                0.2
              )} 0%, ${alpha(mainColor, 0.05)} 70%, transparent 100%)`,
              top: "-150px",
              right: "-100px",
              zIndex: 0,
              filter: "blur(20px)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${alpha(
                mainColor,
                0.15
              )} 0%, ${alpha(mainColor, 0.05)} 70%, transparent 100%)`,
              bottom: "-100px",
              left: "-80px",
              zIndex: 0,
              filter: "blur(25px)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${alpha(
                mainColor,
                0.2
              )} 0%, ${alpha(mainColor, 0.05)} 70%, transparent 100%)`,
              top: "30%",
              left: "10%",
              zIndex: 0,
              filter: "blur(40px)",
            }}
          />

          {/* Content */}
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 6,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  marginBottom: "20px",
                  fontSize: { xs: "28px", sm: "36px" },
                  background: `linear-gradient(135deg, ${mainColor} 0%, #ccaee3 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textAlign: "center",
                  letterSpacing: "-0.5px",
                  position: "relative",
                  display: "inline-block",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: "50%",
                    bottom: "-10px",
                    transform: "translateX(-50%)",
                    width: "60px",
                    height: "4px",
                    borderRadius: "2px",
                    background: `linear-gradient(90deg, ${mainColor} 0%, #ccaee3 100%)`,
                  },
                }}
              >
                Pullim 이용약관
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  textAlign: "center",
                  color: isDarkMode ? alpha("#fff", 0.7) : alpha("#000", 0.6),
                  maxWidth: "80%",
                  mt: 3,
                }}
              >
                서비스 이용을 위한 약관에 동의해 주세요.
              </Typography>
            </Box>

            {termsData.map((term, index) => (
              <Box
                key={index}
                sx={{
                  marginBottom: "24px",
                  borderRadius: "16px",
                  padding: { xs: "16px", sm: "24px" },
                  transition: "all 0.3s ease",
                  backgroundColor: isDarkMode
                    ? alpha("#1a1a1a", 0.6)
                    : alpha("#fff", 0.8),
                  boxShadow: isDarkMode
                    ? "0 4px 15px rgba(0, 0, 0, 0.15)"
                    : "0 4px 15px rgba(0, 0, 0, 0.03)",
                  border: isDarkMode
                    ? `1px solid ${alpha("#fff", 0.08)}`
                    : `1px solid ${alpha("#000", 0.04)}`,
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: isDarkMode
                      ? `0 6px 20px rgba(0, 0, 0, 0.2), 0 0 0 1px ${alpha(
                          mainColor,
                          0.2
                        )}`
                      : `0 8px 30px rgba(3, 203, 132, 0.1), 0 0 0 1px ${alpha(
                          mainColor,
                          0.1
                        )}`,
                  },
                }}
              >
                <TermSection title={term.title}>{term.content}</TermSection>
              </Box>
            ))}

            <Box
              sx={{
                marginTop: "50px",
                padding: { xs: "20px", sm: "30px" },
                borderRadius: "20px",
                backgroundColor: isDarkMode
                  ? alpha(mainColor, 0.1)
                  : alpha(mainColor, 0.05),
                boxShadow: isDarkMode
                  ? `0 8px 20px rgba(0, 0, 0, 0.2), 0 0 0 1px ${alpha(
                      mainColor,
                      0.2
                    )} inset`
                  : `0 8px 25px rgba(3, 203, 132, 0.08), 0 0 0 1px ${alpha(
                      mainColor,
                      0.1
                    )} inset`,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background accents */}
              <Box
                sx={{
                  position: "absolute",
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${alpha(
                    mainColor,
                    0.1
                  )} 0%, transparent 70%)`,
                  top: "-50px",
                  right: "-50px",
                  zIndex: 0,
                }}
              />

              <Box sx={{ position: "relative", zIndex: 1, width: "100%" }}>
                <CheckAgreeSection
                  isAgreed={isAgreed}
                  handleAgreeChange={handleAgreeChange}
                  handleSubmit={handleSubmit}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Button
                    sx={{
                      background: `linear-gradient(135deg, ${mainColor} 0%, #ccaee3 100%)`,
                      color: "white",
                      textTransform: "none",
                      fontWeight: 700,
                      padding: "12px 40px",
                      borderRadius: "50px",
                      fontSize: "16px",
                      marginTop: "10px",
                      transition: "all 0.3s ease",
                      boxShadow: `0 4px 15px ${alpha(mainColor, 0.3)}`,
                      "&:hover": {
                        background: `linear-gradient(135deg, ${mainColor} 20%, #ccaee3 100%)`,
                        boxShadow: `0 8px 25px ${alpha(mainColor, 0.5)}`,
                        transform: "translateY(-3px)",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                        boxShadow: `0 2px 8px ${alpha(mainColor, 0.3)}`,
                      },
                      "&:disabled": {
                        background: isDarkMode ? "#555" : "#e0e0e0",
                        color: isDarkMode ? "#888" : "#999",
                        boxShadow: "none",
                      },
                    }}
                    onClick={handleSubmit}
                    disabled={!isAgreed}
                  >
                    동의 후 제출
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default TermsAndPrivacyPage;
