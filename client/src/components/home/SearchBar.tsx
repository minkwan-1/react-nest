import { Box, TextField, useTheme, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import { useState } from "react";

interface SearchBarProps {
  onSearchChange: (searchTerm: string) => void;
}

const SearchBar = ({ onSearchChange }: SearchBarProps) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, marginBottom: 4 }}>
      <TextField
        variant="outlined"
        placeholder="원하는 주제를 찾아보세요"
        fullWidth
        value={searchTerm}
        onChange={handleChange}
        sx={{
          ...theme.applyStyles("light", { color: "#212121" }),
          ...theme.applyStyles("light", { color: "#ffffff" }),
          flexGrow: 1,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            backgroundColor:
              theme.palette.mode === "dark" ? "#333333" : "#FFFFFF",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            transition: "all 0.3s",
            "&:hover": {
              boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
            },
            "&.Mui-focused": {
              boxShadow: "0 3px 8px rgba(3,203,132,0.25)",
            },
            "&:hover fieldset": {
              borderColor: "#b8dae1",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#b8dae1",
            },
          },
          "& .MuiInputBase-input::placeholder": {
            color: theme.palette.mode === "dark" ? "#ffffff" : "#757575",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#757575" }} />
            </InputAdornment>
          ),
        }}
      />
      <IconButton disableRipple>
        <SearchIcon
          sx={{
            ...theme.applyStyles("light", { color: "#b8dae1" }),
            ...theme.applyStyles("dark", { color: "#ffffff" }),
          }}
        />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
