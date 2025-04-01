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
  Stack,
  Typography,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useColorScheme } from "@mui/material/styles";
import AppbarLogo from "./AppbarLogo";
import ErrorDialog from "./ErrorDialog";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";

// Interface for Appbar Props
interface AppbarProps {
  sx?: SxProps<Theme>;
}

function Appbar({ sx }: AppbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, setMode } = useColorScheme();
  const theme = useTheme();
  const [realUser, setRealUser] = useAtom(realUserInfo);

  // Dark mode toggle function
  const toggleColorMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  // Handle button click for navigation
  const handleButtonClick = () => {
    if (location.pathname === "/") {
      navigate("/home");
    } else {
      navigate("/sign-up");
    }
  };

  // UseEffect to load user from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("realUser");
    if (storedUser) {
      setRealUser(JSON.parse(storedUser));
    }
  }, [setRealUser]);

  // Store user info in localStorage whenever it changes
  useEffect(() => {
    if (realUser) {
      localStorage.setItem("realUser", JSON.stringify(realUser));
    }
  }, [realUser]);

  // Navigation items
  const navItems = [
    { name: "상세", path: "/questions/1" },
    { name: "마이", path: "/my" },
    { name: "인증", path: "/phone" },
    { name: "약관", path: "/privacy" },
    { name: "글쓰기", path: "/edit" },
    { name: "404", path: "*" },
  ];

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
        {/* Left section: Logo and Navigation */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* AppbarLogo Component */}
          <AppbarLogo />

          {/* Navigation Links - 새로 추가된 부분 */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              ml: 5,
              display: { xs: "none", md: "flex" }, // 모바일에서는 숨김
            }}
          >
            {navItems.map((item) => (
              <Typography
                key={item.path}
                variant="body1"
                component="button"
                onClick={() => navigate(item.path)}
                sx={{
                  position: "relative",
                  px: 2,
                  py: 1,
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  background: "none",
                  border: "none",
                  borderRadius: 1,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  textTransform: "none",
                  opacity: location.pathname === item.path ? 1 : 0.7,
                  ...theme.applyStyles("light", {
                    color: location.pathname === item.path ? "#03cb84" : "#333",
                    "&:hover": {
                      opacity: 1,
                      backgroundColor: "rgba(3, 203, 132, 0.05)",
                    },
                  }),
                  ...theme.applyStyles("dark", {
                    color:
                      location.pathname === item.path ? "#03cb84" : "#f0f0f0",
                    "&:hover": {
                      opacity: 1,
                      backgroundColor: "rgba(3, 203, 132, 0.1)",
                    },
                  }),
                  "&::after":
                    location.pathname === item.path
                      ? {
                          content: '""',
                          position: "absolute",
                          bottom: -1,
                          left: "20%",
                          width: "60%",
                          height: "2px",
                          backgroundColor: "#03cb84",
                          borderRadius: "2px",
                        }
                      : {},
                }}
              >
                {item.name}
              </Typography>
            ))}
          </Stack>
        </Box>

        {/* Right section: Theme toggle and User/Auth */}
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
                  width: 40,
                  height: 40,
                  mr: 1,
                  bgcolor: "#03cb84",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  border: "2px solid #fff",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)",
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
