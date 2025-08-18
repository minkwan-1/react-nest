import { useEffect } from "react";
import {
  AppbarLogo,
  ErrorDialog,
  ThemeToggleButton,
  StartButton,
  RealUserTooltip,
  AppbarWrapper,
  LogoutButton,
} from "@domains/layout/appbar";
import { Box, Container, SxProps, Theme } from "@mui/material";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";
import { useFetchMeQuery } from "@domains/auth/api/useAuthHooks";

interface AppbarProps {
  sx?: SxProps<Theme>;
}

function Appbar({ sx }: AppbarProps) {
  const [realUser, setRealUser] = useAtom(realUserInfo);

  const { data, isSuccess, isError } = useFetchMeQuery();

  console.log("!!!!!!!!!!!!!!!!!", useFetchMeQuery().data);
  console.log("!!!!!!!!!!!!!!!!!", realUser?.user);

  useEffect(() => {
    if (isSuccess) {
      console.log("실행됨: ", data);
      setRealUser(data);
    }
    if (isError) {
      setRealUser(null);
    }
  }, [isSuccess, isError, data, setRealUser]);

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
          {realUser?.user ? (
            <>
              <RealUserTooltip />
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
