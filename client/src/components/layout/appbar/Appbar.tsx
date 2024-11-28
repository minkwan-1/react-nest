import { Box, Container, IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useColorScheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

function Appbar() {
  const { mode, setMode } = useColorScheme();

  const navigate = useNavigate();

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "80px",
        position: "sticky",
        top: 0,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: mode === "dark" ? "grey.900" : "white",
        color: mode === "dark" ? "white" : "black",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography>real code</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            sx={{ cursor: "pointer", marginLeft: "10px" }}
            color="inherit"
          >
            <SearchIcon />
          </IconButton>

          <IconButton onClick={toggleMode} color="inherit">
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate("/edit")}>
            <EditIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}

export default Appbar;