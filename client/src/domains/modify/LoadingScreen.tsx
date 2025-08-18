import { PageContainer, ComponentWrapper } from "@domains/layout/common";
import {
  Container,
  Box,
  CircularProgress,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";

const LoadingScreen = () => {
  const theme = useTheme();
  const mainColor = "#b8dae1";
  const isDarkMode = theme.palette.mode === "dark";

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
};

export default LoadingScreen;
