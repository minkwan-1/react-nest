import {
  Box,
  Container,
  Button,
  IconButton,
  SxProps,
  Theme,
  useTheme,
  Avatar,
  Tooltip,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useColorScheme } from "@mui/material/styles";
import AppbarLogo from "./AppbarLogo";
import ErrorDialog from "./ErrorDialog";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAtom } from "jotai"; // Assuming you're using Jotai to manage the state
import { realUserInfo } from "@atom/auth"; // Import your atom for user info

// Interface for Appbar Props
interface AppbarProps {
  sx?: SxProps<Theme>;
}

function Appbar({ sx }: AppbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, setMode } = useColorScheme();
  const theme = useTheme();
  const [realUser, setRealUser] = useAtom(realUserInfo); // Jotai atom for user info

  // Dark mode toggle function
  const toggleColorMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  // Handle button click for navigation
  const handleButtonClick = () => {
    if (location.pathname === "/") {
      navigate("/home"); // Navigate to /home from /
    } else {
      navigate("/sign-up"); // Navigate to /sign-up for other paths
    }
  };

  // UseEffect to load user from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("realUser");
    if (storedUser) {
      setRealUser(JSON.parse(storedUser)); // Set realUser from localStorage
    }
  }, [setRealUser]);

  // Store user info in localStorage whenever it changes
  useEffect(() => {
    if (realUser) {
      localStorage.setItem("realUser", JSON.stringify(realUser));
    }
  }, [realUser]);

  // Get the user's first name for avatar display (assuming realUser has name)
  // const firstName = realUser?.name?.split(" ")[0];

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
        ...theme.applyStyles("light", {
          backgroundColor: "#f8f8f8",
          color: "black",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
          borderBottom: "1px solid #E0E0E0",
        }),
        ...theme.applyStyles("dark", {
          backgroundColor: "#121212",
          color: "white",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          borderBottom: "1px solid #616161",
        }),
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
        {/* AppbarLogo Component */}
        <AppbarLogo />

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Dark mode toggle button */}
          <IconButton
            onClick={toggleColorMode}
            sx={{
              ...theme.applyStyles("light", {
                color: "#555",
              }),
              ...theme.applyStyles("dark", {
                color: "#f0f0f0",
              }),
            }}
          >
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Display user's avatar if logged in */}
          {realUser ? (
            <Tooltip title={realUser.name} onClick={() => navigate("/my")}>
              <Avatar
                sx={{
                  width: 40, // 크기 키움
                  height: 40, // 크기 키움
                  mr: 1,
                  bgcolor: "#03cb84", // 기본 배경 색
                  fontSize: "16px", // 글자 크기
                  fontWeight: "bold", // 글자 두께
                  cursor: "pointer",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // 그림자 추가
                  border: "2px solid #fff", // 흰색 테두리 추가
                  transition: "transform 0.2s ease-in-out", // 클릭 시 애니메이션 효과
                  "&:hover": {
                    transform: "scale(1.1)", // 호버 시 크기 증가
                  },
                }}
                src="https://i.namu.wiki/i/u0c4TvXo_si7IwPcgYdL1XiGz8dhBHbgfCLSIEPm_AKmyzEYDe5oM3TBynQINBM89XE9gBdQ5uvOEvDMU-Uokg.webp"
              />
            </Tooltip>
          ) : (
            <Button
              variant="outlined"
              sx={{
                color: "inherit",
                borderColor: "inherit",
                borderRadius: 50,
                px: 3,
                py: 1,
                textTransform: "none",
                fontWeight: 500,
                ...theme.applyStyles("light", {
                  borderColor: "#00000025",
                  color: "#333",
                  "&:hover": {
                    borderColor: "#00000050",
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }),
                ...theme.applyStyles("dark", {
                  borderColor: "#ffffff25",
                  color: "#f0f0f0",
                  "&:hover": {
                    borderColor: "#ffffff50",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                  },
                }),
              }}
              onClick={handleButtonClick}
            >
              시작하기
            </Button>
          )}
        </Box>
      </Container>

      {/* ErrorDialog Component */}
      <ErrorDialog open={false} message={""} onClose={() => {}} />
    </Box>
  );
}

export default Appbar;
