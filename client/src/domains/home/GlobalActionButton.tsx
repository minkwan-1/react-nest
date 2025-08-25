import { Box, Button, Typography, Tooltip, Zoom } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAtom, useSetAtom } from "jotai";
import { realUserInfo } from "@atom/auth";
import { authRedirectModalAtom } from "@atom/modalAtoms";

const GlobalActionButton = () => {
  const navigate = useNavigate();
  const [userInfo] = useAtom(realUserInfo);
  console.log(userInfo);
  const showAuthRedirectModal = useSetAtom(authRedirectModalAtom);

  const handleClick = () => {
    if (!userInfo?.user) {
      showAuthRedirectModal(true);
    } else {
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
          onClick={handleClick}
          variant="contained"
          sx={{
            bgcolor: "#b8dae1",
            borderRadius: "50%",
            width: 64,
            height: 64,
            minWidth: 0,
            boxShadow: "0 4px 12px rgba(184, 218, 225, 0.6)",
            transition: "all 0.3s",
            "&:hover": {
              bgcolor: "#a2cbd4",
              boxShadow: "0 6px 16px rgba(162, 203, 212, 0.6)",
              transform: "translateY(-2px)",
            },
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
            +
          </Typography>
        </Button>
      </Tooltip>
    </Box>
  );
};

export default GlobalActionButton;
