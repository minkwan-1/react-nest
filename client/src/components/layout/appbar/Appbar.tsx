import { useEffect, useState } from "react";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { Code } from "lucide-react";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import EditIcon from "@mui/icons-material/Edit";
import { useColorScheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

function Appbar() {
  const { mode, setMode } = useColorScheme();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  useEffect(() => {
    // localStorage에서 닉네임 가져오기 또는 URL에서 가져오기
    const storedNickname = new URLSearchParams(window.location.search).get(
      "nickname"
    );

    // URL에서 가져온 닉네임을 localStorage에 저장
    if (storedNickname) {
      localStorage.setItem("nickname", storedNickname);
      setNickname(storedNickname);
    } else {
      // localStorage에서 닉네임 가져오기
      const localStorageNickname = localStorage.getItem("nickname");
      if (localStorageNickname) {
        setNickname(localStorageNickname);
      }
    }
  }, []);

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
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <Code size={24} className="text-primary" />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginLeft: "8px",
              color: mode === "dark" ? "white" : "black",
            }}
          >
            RealCode_
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {nickname && (
            <Typography
              sx={{ marginRight: "16px", fontWeight: "bold" }}
              variant="body1"
            >
              {nickname}님
            </Typography>
          )}
          <IconButton
            sx={{ cursor: "pointer", marginLeft: "10px" }}
            color="inherit"
          >
            <SearchIcon />
          </IconButton>

          <IconButton onClick={toggleMode} color="inherit">
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => navigate("/edit")}
            sx={{ cursor: "pointer" }}
          >
            <EditIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}

export default Appbar;
