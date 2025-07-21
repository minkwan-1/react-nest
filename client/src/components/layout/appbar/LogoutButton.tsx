import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "./api/logoutUser";

const LogoutButton = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      navigate("/");
    },
    onError: (err) => {
      console.error("로그아웃 실패:", err);
    },
  });

  const handleButtonClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{
          color: "inherit",
          borderColor: "inherit",
          borderRadius: 50,
          px: 3,
          py: 1,
          textTransform: "none",
          fontWeight: 500,
          ...theme.applyStyles("light", {
            borderColor: "#00000025",
            color: "#333",
            "&:hover": {
              borderColor: "#00000050",
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }),
          ...theme.applyStyles("dark", {
            borderColor: "#ffffff25",
            color: "#f0f0f0",
            "&:hover": {
              borderColor: "#ffffff50",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            },
          }),
        }}
        onClick={handleButtonClick}
      >
        로그아웃
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle
          sx={{
            fontWeight: 700,
            color: "#2e4950",
            fontSize: "1.25rem",
            textAlign: "center",
            mt: 1,
            ...theme.applyStyles("dark", {
              color: "#f0f0f0",
            }),
          }}
        >
          정말 로그아웃 하시겠어요?
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            sx={{
              fontSize: "0.95rem",
              textAlign: "center",
              color: "#4d6d74",
              px: 2,
              lineHeight: 1.5,
              userSelect: "none",
              ...theme.applyStyles("dark", {
                color: "#f0f0f0",
              }),
            }}
          >
            로그아웃하면 앱 이용이 종료돼요.
            <br />
            다음에 다시 로그인 하시면 바로 시작할 수 있어요.
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 2, mt: 1 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            disabled={logoutMutation.isPending}
            sx={{
              color: "inherit",
              borderColor: "inherit",
              borderRadius: 50,
              px: 3,
              py: 1,
              textTransform: "none",
              fontWeight: 500,
              ...theme.applyStyles("light", {
                borderColor: "#00000025",
                color: "#333",
                "&:hover": {
                  borderColor: "#00000050",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }),
              ...theme.applyStyles("dark", {
                borderColor: "#ffffff25",
                color: "#f0f0f0",
                "&:hover": {
                  borderColor: "#ffffff50",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                },
              }),
            }}
          >
            아니요, 계속할래요
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              handleClose();
              logoutMutation.mutate();
            }}
            disabled={logoutMutation.isPending}
            sx={{
              fontWeight: 600,
              color: "inherit",
              borderColor: "inherit",
              borderRadius: 50,
              px: 3,
              py: 1,
              textTransform: "none",
              ...theme.applyStyles("light", {
                borderColor: "#00000025",
                color: "#333",
                "&:hover": {
                  borderColor: "#00000050",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }),
              ...theme.applyStyles("dark", {
                borderColor: "#ffffff25",
                color: "#f0f0f0",
                "&:hover": {
                  borderColor: "#ffffff50",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                },
              }),
            }}
          >
            {logoutMutation.isPending ? "로그아웃 중..." : "네, 로그아웃할게요"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LogoutButton;
