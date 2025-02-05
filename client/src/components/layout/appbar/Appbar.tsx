import { useEffect, useState } from "react";
import {
  Box,
  Container,
  IconButton,
  Typography,
  SxProps,
  Theme,
} from "@mui/material";
import { Code } from "lucide-react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useColorScheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { google, naver, kakao } from "../../../images";

type AppbarProps = {
  sx?: SxProps<Theme>;
};

function Appbar({ sx }: AppbarProps) {
  const { mode, setMode } = useColorScheme();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const storedNickname = new URLSearchParams(window.location.search).get(
      "nickname"
    );

    if (storedNickname) {
      localStorage.setItem("nickname", storedNickname);
      setNickname(storedNickname);
    } else {
      const localStorageNickname = localStorage.getItem("nickname");
      if (localStorageNickname) {
        setNickname(localStorageNickname);
      }
    }
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    window.location.href = `http://localhost:3000/auth/${provider}/login`;
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "80px",
        position: "sticky",
        top: 0,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: mode === "dark" ? "grey.900" : "white",
        color: mode === "dark" ? "white" : "black",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        ...sx,
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* 로고 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <Code
            size={24}
            className="text-primary"
            style={{ color: "03cb84" }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginLeft: "8px",
              color: mode === "dark" ? "white" : "black",
            }}
          >
            Pullim
          </Typography>
        </Box>

        {/* 우측 아이콘들 */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {nickname && (
            <Typography
              sx={{ marginRight: "16px", fontWeight: "bold" }}
              variant="body1"
            >
              {nickname}님
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton
              onClick={toggleMode}
              sx={{
                color: "#03cb84",
                border: "1px solid #adb5be",
                width: "32px",
                height: "32px",
              }}
            >
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <img
              src={google}
              alt="Google 로그인"
              style={{ width: "32px", height: "32px", cursor: "pointer" }}
              onClick={() => handleOAuthLogin("google")}
            />
            <img
              src={kakao}
              alt="Kakao 로그인"
              style={{ width: "32px", height: "32px", cursor: "pointer" }}
              onClick={() => handleOAuthLogin("kakao")}
            />
            <img
              src={naver}
              alt="Naver 로그인"
              style={{ width: "32px", height: "32px", cursor: "pointer" }}
              onClick={() => handleOAuthLogin("naver")}
            />
          </Box>
          {/* <IconButton
            onClick={() => navigate("/edit")}
            sx={{ cursor: "pointer", color: "#03cb84" }}
          >
            <EditIcon />
          </IconButton> */}
        </Box>
      </Container>
    </Box>
  );
}

export default Appbar;
