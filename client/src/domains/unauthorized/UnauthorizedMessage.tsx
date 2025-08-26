import { Typography } from "@mui/material";

const UnauthorizedMessage = () => {
  return (
    <>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: 600,
        }}
      >
        로그인이 필요한 페이지입니다.
      </Typography>

      <Typography
        variant="body1"
        color="textSecondary"
        sx={{
          mb: 4,
          maxWidth: "500px",
          mx: "auto",
          px: 2,
        }}
      >
        이 페이지에 접근하시려면 먼저 로그인이 필요합니다. <br /> 로그인 후 다시
        시도해 주세요.
      </Typography>
    </>
  );
};

export default UnauthorizedMessage;
