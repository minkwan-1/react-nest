import { useEffect, useState } from "react";
import {
  Box,
  Container,
  IconButton,
  Typography,
  SxProps,
  TextField,
  Theme,
} from "@mui/material";
import { Code } from "lucide-react";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import EditIcon from "@mui/icons-material/Edit";
import { useColorScheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

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

        {/* 중앙에 서치바 */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            marginLeft: "16px",
            marginRight: "16px",
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: "100%",
              maxWidth: "400px",
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#f5f7fb", // 내부 배경색 적용
                "& fieldset": {
                  borderColor: mode === "dark" ? "grey.700" : "grey.300",
                },
                "&:hover fieldset": {
                  borderColor: mode === "dark" ? "grey.500" : "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: mode === "dark" ? "grey.400" : "primary.main",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
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
          <IconButton onClick={toggleMode} sx={{ color: "#03cb84" }}>
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <IconButton
            onClick={() => navigate("/edit")}
            sx={{ cursor: "pointer", color: "#03cb84" }}
          >
            <EditIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}

export default Appbar;
