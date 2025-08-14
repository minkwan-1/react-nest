import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

interface SearchBarProps {
  onSearchChange: (searchTerm: string) => void;
}

const SearchBar = ({ onSearchChange }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, marginBottom: 4 }}>
      <TextField
        placeholder="원하는 주제를 찾아보세요"
        value={searchTerm}
        onChange={handleChange}
        sx={{
          width: 400,
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            transition: "all 0.3s",
            backgroundColor: "background.paper",
            "&:hover": {
              boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
            },
            "&.Mui-focused": {
              boxShadow: "0 3px 8px rgba(3,203,132,0.25)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "transparent",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
