import { Typography } from "@mui/material";

const NotFoundMessage = () => {
  return (
    <>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: 600,
          color: (theme) => (theme.palette.mode === "dark" ? "#fff" : "#333"),
        }}
      >
        페이지를 찾을 수 없습니다.
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
        요청하신 페이지가 존재하지 않거나 삭제되었을 수 있습니다.
      </Typography>
    </>
  );
};

export default NotFoundMessage;
