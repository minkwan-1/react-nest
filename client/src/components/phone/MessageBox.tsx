import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface MessageBoxProps {
  message: string;
  messageType: "info" | "success" | "error" | "warning";
  open: boolean;
  onClose: () => void;
  autoHideDuration?: number;
  isExistingUser?: boolean;
  isSignupComplete?: boolean;
}

const MessageBox = ({
  message,
  messageType,
  open,
  onClose,

  isExistingUser = false,
  isSignupComplete = false,
}: MessageBoxProps) => {
  const navigate = useNavigate();
  const keyColor = "#b8dae1";

  const colors = {
    info: {
      main: keyColor,
      light: `${keyColor}30`,
      gradient: `linear-gradient(135deg, ${keyColor}15, ${keyColor}05)`,
    },
    success: {
      main: keyColor,
      light: `${keyColor}30`,
      gradient: `linear-gradient(135deg, ${keyColor}15, ${keyColor}05)`,
    },
    error: {
      main: keyColor,
      light: `${keyColor}30`,
      gradient: `linear-gradient(135deg, ${keyColor}15, ${keyColor}05)`,
    },
    warning: {
      main: keyColor,
      light: `${keyColor}30`,
      gradient: `linear-gradient(135deg, ${keyColor}15, ${keyColor}05)`,
    },
  };

  const icons = {
    info: <InfoOutlinedIcon sx={{ fontSize: 48 }} />,
    success: <CheckCircleOutlineIcon sx={{ fontSize: 48 }} />,
    error: <ErrorOutlineIcon sx={{ fontSize: 48 }} />,
    warning: <InfoOutlinedIcon sx={{ fontSize: 48 }} />, // 적절한 warning 아이콘 사용 가능
  };

  const titles = {
    info: "알림",
    success: isExistingUser
      ? "로그인 안내"
      : isSignupComplete
      ? "회원가입 완료"
      : "인증 완료",
    error: "오류 발생",
    warning: "주의",
  };

  const handleButtonClick = () => {
    navigate("/sign-in");
    onClose();
  };

  const getButtonText = () => {
    if ((isExistingUser || isSignupComplete) && messageType === "success") {
      return "로그인하러 가기";
    }
    return "확인";
  };

  const getButtonIcon = () => {
    if ((isExistingUser || isSignupComplete) && messageType === "success") {
      return <LoginIcon />;
    }
    if (messageType === "success" && !isExistingUser && !isSignupComplete) {
      return <PersonAddIcon />;
    }
    return null;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: `0 20px 60px ${colors[messageType].main}20`,
          border: `1px solid ${colors[messageType].main}20`,
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(8px)",
        },
      }}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <Box
          sx={{
            position: "relative",
            background: colors[messageType].gradient,
            borderBottom: `3px solid ${colors[messageType].main}`,
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background: `linear-gradient(90deg, transparent, ${colors[messageType].main}40, transparent)`,
            },
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 12,
              top: 12,
              color: "text.secondary",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                transform: "scale(1.1)",
              },
              transition: "all 0.2s ease",
              zIndex: 1,
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          <DialogContent sx={{ textAlign: "center", py: 5, px: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
              >
                <Box
                  sx={{
                    color: colors[messageType].main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${colors[messageType].main}10, ${colors[messageType].main}20)`,
                    border: `2px solid ${colors[messageType].main}30`,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {icons[messageType]}
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{
                    color: colors[messageType].main,
                    mb: 1,
                    letterSpacing: "-0.5px",
                  }}
                >
                  {titles[messageType]}
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    textAlign: "center",
                    lineHeight: 1.7,
                    fontSize: "1.05rem",
                    fontWeight: 400,
                    maxWidth: "300px",
                  }}
                >
                  {message}
                </Typography>
              </motion.div>
            </Box>
          </DialogContent>

          <DialogActions sx={{ px: 4, pb: 4, justifyContent: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={handleButtonClick}
                variant="contained"
                size="large"
                sx={{
                  bgcolor: colors[messageType].main,
                  color: "white",
                  borderRadius: 3,
                  px: 5,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                  boxShadow: `0 8px 24px ${colors[messageType].main}40`,
                  "&:hover": {
                    bgcolor: colors[messageType].main,
                    opacity: 0.9,
                    transform: "translateY(-2px)",
                    boxShadow: `0 12px 32px ${colors[messageType].main}50`,
                  },
                  "&:active": {
                    transform: "translateY(0px)",
                  },
                  transition: "all 0.3s ease",
                }}
                endIcon={getButtonIcon()}
              >
                {getButtonText()}
              </Button>
            </motion.div>
          </DialogActions>
        </Box>
      </motion.div>
    </Dialog>
  );
};

export default MessageBox;
