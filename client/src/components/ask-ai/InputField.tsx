import {
  Box,
  IconButton,
  TextField,
  Paper,
  CircularProgress,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RefreshIcon from "@mui/icons-material/Refresh";
import { alpha } from "@mui/system";

interface InputFieldProps {
  prompt: string;
  setPrompt: (value: string) => void;
  handleSubmit: () => void;
  handleReset: () => void;
  loading: boolean;
}

const InputField = ({
  prompt,
  setPrompt,
  handleSubmit,
  handleReset,
  loading,
}: InputFieldProps) => {
  const theme = useTheme();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Box
      component={Paper}
      elevation={2}
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1,
        pl: 2,
        mb: 2,
        borderRadius: 4,
        bgcolor: alpha(theme.palette.background.paper, 0.9),
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      {/* Text Field */}
      <TextField
        variant="standard"
        placeholder="질문을 입력하세요"
        fullWidth
        multiline
        maxRows={4}
        InputProps={{
          disableUnderline: true,
        }}
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "16px",
            py: 1,
          },
        }}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      {/* Refresh Button */}
      <IconButton
        onClick={handleReset}
        sx={{ color: alpha(theme.palette.text.secondary, 0.7) }}
      >
        <RefreshIcon />
      </IconButton>
      {/* Send Button */}
      <IconButton
        onClick={handleSubmit}
        disabled={loading || !prompt.trim()}
        sx={{
          bgcolor: "#b8dae1",
          color: "white",
          "&:hover": {
            bgcolor: "#028a66",
          },
          "&.Mui-disabled": {
            bgcolor: alpha("#b8dae1", 0.4),
            color: "white",
          },
          ml: 1,
          borderRadius: 2,
          width: 40,
          height: 40,
        }}
      >
        {loading ? (
          <CircularProgress size={20} sx={{ color: "white" }} />
        ) : (
          <SendIcon />
        )}
      </IconButton>
    </Box>
  );
};

export default InputField;
