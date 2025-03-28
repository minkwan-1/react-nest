import {
  Box,
  Container,
  Button,
  IconButton,
  SxProps,
  Theme,
  useTheme,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useColorScheme } from "@mui/material/styles";
import AppbarLogo from "./AppbarLogo";
import ErrorDialog from "./ErrorDialog";
import { useNavigate, useLocation } from "react-router-dom";

// Interface for Appbar Props
interface AppbarProps {
  sx?: SxProps<Theme>;
}

function Appbar({ sx }: AppbarProps) {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 가져오기
  const { mode, setMode } = useColorScheme();
  const theme = useTheme();

  // 다크모드 토글 함수
  const toggleColorMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  // 시작하기/살펴보기 버튼 클릭 이벤트
  const handleButtonClick = () => {
    if (location.pathname === "/") {
      navigate("/home"); // / 경로에서 /home으로 이동
    } else {
      navigate("/sign-up"); // 그 외 경로에서 /sign-up으로 이동
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
          {/* 다크모드 토글 버튼 */}
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

          {/* 시작하기/살펴보기 버튼 */}
          {location.pathname == "/" ? (
            <></>
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

      {/* ErrorDialog Component - 유지 */}
      <ErrorDialog open={false} message={""} onClose={() => {}} />
    </Box>
  );
}

export default Appbar;
