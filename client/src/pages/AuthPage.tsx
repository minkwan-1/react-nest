import { Box, TextField, Typography, Button } from "@mui/material";
import { PageContainer, ComponentWrapper } from "../components/layout/common";

import { google, kakao, naver } from "../images/index";

const AuthPage = () => {
  // const handleLocalLogin = () => {
  //   window.location.href = "http://localhost:3000/auth/login";
  // };

  // const handleLocalSignup = () => {
  //   window.location.href = "http://localhost:3000/auth/signup";
  // };

  const handleKakaoLogin = () => {
    window.location.href = "http://localhost:3000/auth/kakao/login";
  };

  const handleNaverLogin = () => {
    window.location.href = "http://localhost:3000/auth/naver/login";
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google/login";
  };

  return (
    <PageContainer>
      <ComponentWrapper sx={{ maxWidth: "600px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "80vh",
          }}
        >
          {/* title */}
          <Box
            sx={{
              marginBottom: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "36px",
              }}
            >
              RealCode_
            </Typography>
          </Box>

          {/* login inputs */}
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField sx={{ width: "70%" }} label="Username" />
            <TextField sx={{ width: "70%" }} label="Password" type="password" />
            <Button
              sx={{
                width: "70%",
                border: (theme) => {
                  return {
                    ...theme.applyStyles("light", {
                      border: "1px solid black",
                    }),
                    ...theme.applyStyles("dark", {
                      border: "1px solid white",
                    }),
                  };
                },
                textAlign: "center",
                color: (theme) => {
                  return {
                    ...theme.applyStyles("light", {
                      color: "black",
                    }),
                    ...theme.applyStyles("dark", {
                      color: "white",
                    }),
                  };
                },
              }}
            >
              로그인 하기
            </Button>

            {/* SNS 간편 로그인 */}
            <Box
              sx={{
                width: "70%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Typography sx={{ fontSize: "14px" }}>SNS 간편 로그인</Typography>

              {/* Social login image buttons */}
              <Box sx={{ display: "flex" }}>
                <Button sx={{ padding: "0" }} onClick={handleKakaoLogin}>
                  <img
                    src={kakao}
                    alt="Kakao Login"
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                  />
                </Button>
                <Button sx={{ padding: "0" }} onClick={handleNaverLogin}>
                  <img
                    src={naver}
                    alt="Naver Login"
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                  />
                </Button>
                <Button sx={{ padding: "0" }} onClick={handleGoogleLogin}>
                  <img
                    src={google}
                    alt="Google Login"
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                  />
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default AuthPage;
