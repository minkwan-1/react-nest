import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Typography, Button, Container } from "@mui/material";

// 애니메이션 설정
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #b9fbc0 0%, #f2fcf0 100%)",
        color: "black",
        padding: 2,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        {/* 타이틀 */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.8rem", sm: "2.8rem", md: "3.8rem" },
              mb: 6, // 간격 추가
              color: "#03cb84",
            }}
          >
            프로그래밍 문제에 대한 모든 해답
            <br /> Pullim에서 '풀림'을 경험하세요
          </Typography>
        </motion.div>

        {/* 서브타이틀 */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.5 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1.3rem", sm: "1.6rem", md: "1.9rem" },
              fontWeight: "300",
              mb: 7, // 간격 추가
              color: "#666",
            }}
          >
            당신의 문제는 더 이상 풀리지 않는 고민이 아닙니다
            <br />
            함께 해답을 찾아봐요
          </Typography>
        </motion.div>

        {/* 버튼 */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 1 }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              fontSize: "1.2rem",
              padding: "14px 28px",
              borderRadius: "30px",
              backgroundColor: "#03cb84",
              color: "white",
              "&:hover": {
                backgroundColor: "#029960",
              },
            }}
            onClick={() => navigate("/home")}
          >
            시작하기
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LandingPage;
