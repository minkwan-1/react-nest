import { useFetchMeQuery } from "@domains/auth/api/useAuthHooks";
import { CircularProgress } from "@mui/material";
import { SessionExpiredPage } from "../pages/index";

const AuthenticatedWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, isLoading } = useFetchMeQuery();
  return (
    <>
      {isLoading ? (
        <CircularProgress sx={{ color: "#b8dae1" }} />
      ) : data?.user ? (
        <>{children}</>
      ) : (
        <SessionExpiredPage />
      )}
    </>
  );
};
export default AuthenticatedWrapper;
