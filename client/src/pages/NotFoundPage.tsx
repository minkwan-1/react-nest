import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  CircleDecoration,
  NotFoundHeading,
  NotFoundMessage,
  GoHomeButton,
} from "@components/not-found";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const mainColor = "#b8dae1";
  const accentColor = "#7fb8c4";

  const handleGoLanding = () => {
    navigate("/home");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CircleDecoration
        size={300}
        color={`${mainColor}20`}
        position="topRight"
      />

      <CircleDecoration
        size={200}
        color={`${mainColor}10`}
        position="bottomLeft"
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <NotFoundHeading mainColor={mainColor} accentColor={accentColor} />
        <NotFoundMessage />
        <GoHomeButton
          mainColor={mainColor}
          accentColor={accentColor}
          handleGoLanding={handleGoLanding}
        />
      </Box>
    </Box>
  );
};

export default NotFoundPage;
