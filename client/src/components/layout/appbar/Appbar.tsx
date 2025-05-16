import { useEffect } from "react";
import {
  AppbarLogo,
  ErrorDialog,
  ThemeToggleButton,
  StartButton,
  RealUserTooltip,
  AppbarWrapper,
  LogoutButton,
} from "@components/layout/appbar";
import { Box, Container, SxProps, Theme } from "@mui/material";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";

interface AppbarProps {
  sx?: SxProps<Theme>;
}

function Appbar({ sx }: AppbarProps) {
  const [realUser, setRealUser] = useAtom(realUserInfo);

  // console.log("전역 상태를 사용 중인지?: ", realUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("로그인되지 않았습니다.");
        }

        const data = await response.json();
        setRealUser(data?.user);
        // console.log("로그인 세션 유지에 대한 데이터: ", data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [setRealUser]);

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
          {realUser ? (
            <>
              <RealUserTooltip realUser={realUser} />
              <LogoutButton />
            </>
          ) : (
            <StartButton />
          )}
        </Box>
      </Container>

      <ErrorDialog open={false} message={""} onClose={() => {}} />
    </AppbarWrapper>
  );
}

export default Appbar;
