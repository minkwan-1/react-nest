import { Box, TextField, useTheme } from "@mui/material";
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
        value={searchTerm}
        onChange={handleChange}
        sx={{
          width: 400,
          ...theme.applyStyles("light", { color: "#212121" }),
          ...theme.applyStyles("dark", {
            color: "#ffffff",
          }),
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            transition: "all 0.3s",
            ...theme.applyStyles("light", {
              backgroundColor: "#FFFFFF",
            }),
            ...theme.applyStyles("dark", {
              backgroundColor: "#333333",
            }),
            "&:hover": {
              boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
            },
            "&.Mui-focused": {
              boxShadow: "0 3px 8px rgba(3,203,132,0.25)",
            },
            "&:hover fieldset": {
              ...theme.applyStyles("light", {
                borderColor: "#b8dae1",
              }),
              ...theme.applyStyles("dark", {
                borderColor: "#b8dae1",
              }),
            },
            "&.Mui-focused fieldset": {
              ...theme.applyStyles("light", {
                borderColor: "#b8dae1",
              }),
              ...theme.applyStyles("dark", {
                borderColor: "#b8dae1",
              }),
            },
          },
          "& .MuiInputBase-input::placeholder": {
            ...theme.applyStyles("light", {
              color: "#757575",
            }),
            ...theme.applyStyles("dark", {
              color: "#ffffff",
            }),
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{
                  ...theme.applyStyles("light", {
                    color: "#757575",
                  }),
                  ...theme.applyStyles("dark", {
                    color: "#ffffff",
                  }),
                }}
              />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
