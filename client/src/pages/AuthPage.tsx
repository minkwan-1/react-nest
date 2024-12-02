import { Box, TextField, Typography, Button } from "@mui/material";
import { PageContainer, ComponentWrapper } from "../components/layout/common";

// Import image assets
import { google, kakao, naver } from "../images/index";

const AuthPage = () => {
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
                border: "none",
                color: "white",
                bgcolor: "black",
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
              <Typography sx={{ fontWeight: "bold" }}>
                SNS 간편 로그인
              </Typography>

              {/* Social login image buttons */}
              <Box sx={{ display: "flex" }}>
                <Button sx={{ padding: "0" }}>
                  <img
                    src={kakao}
                    alt="Kakao Login"
                    style={{
                      width: "30px",
                      height: "30px",
                    }}
                  />
                </Button>
                <Button sx={{ padding: "0" }}>
                  <img
                    src={naver}
                    alt="Naver Login"
                    style={{
                      width: "30px",
                      height: "30px",
                    }}
                  />
                </Button>
                <Button sx={{ padding: "0" }}>
                  <img
                    src={google}
                    alt="Google Login"
                    style={{
                      width: "30px",
                      height: "30px",
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
