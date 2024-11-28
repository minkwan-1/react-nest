import {
  Box,
  Container,
  Typography,
  Link,
  TextField,
  Button,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        borderTop: "1px solid #333",
        bgcolor: "#000",
        py: 4,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Typography variant="body2" sx={{ color: "#aaa", mb: 1 }}>
          © 2024 RealCode_. All rights reserved.
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Link href="#" color="#fff" underline="hover">
            서비스 이용약관
          </Link>
          <Link href="#" color="#fff" underline="hover">
            개인정보 처리방침
          </Link>
          <Link href="#" color="#fff" underline="hover">
            문의하기
          </Link>
        </Box>

        {/* 소셜 미디어 링크 */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link href="#" color="#fff">
            <Facebook />
          </Link>
          <Link href="#" color="#fff">
            <Twitter />
          </Link>
          <Link href="#" color="#fff">
            <Instagram />
          </Link>
          <Link href="#" color="#fff">
            <LinkedIn />
          </Link>
        </Box>

        {/* 뉴스레터 구독 섹션 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            bgcolor: "#222",
            padding: "10px 20px",
            borderRadius: "8px",
            width: "100%",
          }}
        >
          <Typography variant="h6" sx={{ color: "#fff" }}>
            뉴스레터 구독하기
          </Typography>
          <Typography variant="body2" sx={{ color: "#aaa" }}>
            RealCode_의 최신 소식을 받아보세요!
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Your email"
              sx={{ bgcolor: "#fff", borderRadius: "4px" }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#444",
                color: "#fff",
                "&:hover": { bgcolor: "#666" },
              }}
            >
              구독하기
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
