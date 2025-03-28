import { Box, Typography, Paper, useTheme } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { motion } from "framer-motion";

interface MessageBoxProps {
  message: string;
  messageType: "info" | "success" | "error";
}

const MessageBox = ({ message, messageType }: MessageBoxProps) => {
  const theme = useTheme();

  if (!message) return null;

  const icons = {
    info: <InfoOutlinedIcon />,
    success: <CheckCircleOutlineIcon />,
    error: <ErrorOutlineIcon />,
  };

  const colors = {
    info: {
      bg: theme.palette.info.light + "20",
      border: theme.palette.info.main,
      icon: theme.palette.info.main,
    },
    success: {
      bg: theme.palette.success.light + "20",
      border: theme.palette.success.main,
      icon: theme.palette.success.main,
    },
    error: {
      bg: theme.palette.error.light + "20",
      border: theme.palette.error.main,
      icon: theme.palette.error.main,
    },
  };

  return (
    <Box sx={{ mb: 3 }}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            backgroundColor: colors[messageType].bg,
            borderLeft: `4px solid ${colors[messageType].border}`,
            overflow: "hidden",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: `radial-gradient(circle at top left, ${colors[messageType].border}20, transparent 70%)`,
              zIndex: 0,
            },
          }}
        >
          <Box sx={{ color: colors[messageType].icon, zIndex: 1 }}>
            {icons[messageType]}
          </Box>
          <Typography variant="body2" sx={{ zIndex: 1, fontWeight: 500 }}>
            {message}
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default MessageBox;
