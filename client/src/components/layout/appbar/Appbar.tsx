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
import useFetchMyInfo from "@components/my-info/hooks/useFetchMyInfo";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "./api/fetchUserInfo";

interface AppbarProps {
  sx?: SxProps<Theme>;
}

function Appbar({ sx }: AppbarProps) {
  const [realUser, setRealUser] = useAtom(realUserInfo);

  const { data: myInfo } = useFetchMyInfo(realUser?.id);
  const userProfileImage = myInfo?.profileImageUrl;

  const {
    data: user,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: fetchUserInfo,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      setRealUser(user);
    }
    if (isError) {
      setRealUser(null);
    }
  }, [isSuccess, isError, user, setRealUser]);

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
              <RealUserTooltip
                realUser={realUser}
                userProfileImage={userProfileImage}
              />
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
