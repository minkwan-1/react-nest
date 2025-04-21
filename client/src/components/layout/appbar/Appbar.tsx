import { useEffect } from "react";
import {
  AppbarLogo,
  ErrorDialog,
  ThemeToggleButton,
  StartButton,
  RealUserTooltip,
  AppbarWrapper,
} from "@components/layout/appbar";
import { Box, Container, SxProps, Theme } from "@mui/material";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";

interface AppbarProps {
  sx?: SxProps<Theme>;
}

function Appbar({ sx }: AppbarProps) {
  const [realUser, setRealUser] = useAtom(realUserInfo);

  useEffect(() => {
    const storedUser = localStorage.getItem("realUser");
    if (storedUser) {
      setRealUser(JSON.parse(storedUser));
    }
  }, [setRealUser]);

  useEffect(() => {
    if (realUser) {
      localStorage.setItem("realUser", JSON.stringify(realUser));
    }
  }, [realUser]);

  return (
    <AppbarWrapper sx={sx}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AppbarLogo />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ThemeToggleButton />
          {realUser ? <RealUserTooltip realUser={realUser} /> : <StartButton />}
        </Box>
      </Container>

      <ErrorDialog open={false} message={""} onClose={() => {}} />
    </AppbarWrapper>
  );
}

export default Appbar;
