import { Box, Container, Typography } from "@mui/material";
import { Code } from "lucide-react";
import { useNavigate } from "react-router-dom";

// borderBottom: (theme) => {
//   return {
//     ...theme.applyStyles("light", {
//       borderBottom: "1px solid red",
//     }),
//     ...theme.applyStyles("dark", {
//       borderBottom: "1px solid #30363d",
//     }),
//   };
// },

export default function Footer() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: (theme) => {
          return {
            ...theme.applyStyles("light", {
              bgcolor: "white",
            }),
            ...theme.applyStyles("dark", {
              bgcolor: "black",
            }),
          };
        },
        color: (theme) => {
          return {
            ...theme.applyStyles("light", {
              color: "black",
            }),
            ...theme.applyStyles("dark", {
              color: "white",
            }),
          };
        },
        py: 8,
      }}
    >
      <Container
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 4,
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", mb: { xs: 2, md: 0 } }}
          >
            <Code size={24} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginLeft: 1,
                color: (theme) => {
                  return {
                    ...theme.applyStyles("light", {
                      color: "black",
                    }),
                    ...theme.applyStyles("dark", {
                      color: "white",
                    }),
                  };
                },
              }}
            >
              RealCode_
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "primary.main",
                },
              }}
              onClick={() => navigate("#features")}
            >
              특징
            </Typography>
            <Typography
              variant="body2"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "primary.main",
                },
              }}
              onClick={() => navigate("#process")}
            >
              프로세스
            </Typography>
            <Typography
              variant="body2"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "primary.main",
                },
              }}
              onClick={() => navigate("#contact")}
            >
              문의하기
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 8, textAlign: "center", color: "gray.400" }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} RealCode_. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
