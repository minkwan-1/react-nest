// src/hooks/useMessageHandler.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useMessageHandler = () => {
  const navigate = useNavigate();
  const [messageState, setMessageState] = useState({
    open: false,
    message: "",
    type: "info" as "info" | "success" | "error" | "warning",
    isExistingUser: false,
    isSignupComplete: false,
  });

  const showMessage = (
    message: string,
    type: "info" | "success" | "error",
    isExistingUser = false,
    isSignupComplete = false
  ) => {
    setMessageState({
      open: true,
      message,
      type,
      isExistingUser,
      isSignupComplete,
    });
  };

  const closeMessage = () => {
    setMessageState((prev) => ({ ...prev, open: false }));

    // ✅ warning type도 sign-in으로 이동
    if (
      messageState.isExistingUser ||
      messageState.isSignupComplete ||
      messageState.type === "warning"
    ) {
      setTimeout(() => {
        navigate("/start");
      }, 300);
    }
  };
  return {
    messageState,
    showMessage,
    closeMessage,
  };
};
