import { Box, Button, Typography, Tooltip, Zoom } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { realUserInfo } from "@atom/auth";

const GlobalActionButton = () => {
  const navigate = useNavigate();
  const [userInfo] = useAtom(realUserInfo);

  const handleClick = () => {
    if (!userInfo) {
      navigate("/sign-in");
    } else {
      console.log("edit으로");
      navigate("/edit");
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 30,
        right: 30,
        zIndex: 1000,
      }}
    >
      <Tooltip
        title="질문을 작성해보세요"
        placement="left"
        arrow
        TransitionComponent={Zoom}
        sx={{
          fontSize: "14px",
        }}
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: "#333333",
              color: "white",
              fontSize: "14px",
              fontWeight: "medium",
              padding: "8px 12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              borderRadius: "6px",
            },
          },
          arrow: {
            sx: {
              color: "#333333",
            },
          },
        }}
      >
        <Button
          onClick={() => handleClick()}
          variant="contained"
          sx={{
            bgcolor: "#03cb84",
            borderRadius: "50%",
            width: 64,
            height: 64,
            minWidth: 0,
            boxShadow: "0 4px 12px rgba(3,203,132,0.5)",
            transition: "all 0.3s",
            "&:hover": {
              bgcolor: "#02a770",
              boxShadow: "0 6px 16px rgba(3,203,132,0.6)",
              transform: "translateY(-2px)",
            },
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            +
          </Typography>
        </Button>
      </Tooltip>
    </Box>
  );
};

export default GlobalActionButton;
