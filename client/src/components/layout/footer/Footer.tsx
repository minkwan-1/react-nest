import { Box, Container, Typography } from "@mui/material";
import { Code } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
              Features
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
              Process
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
              Contact
            </Typography>
          </Box>
        </Box>

        {/* Add Business Registration Information */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            mt: 4,
            color: "gray.400",
          }}
        >
          <Typography variant="body2" sx={{ mb: 1 }}>
            RealCode, Inc.
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            EIN: 12-3456789 | CEO: 원민관
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Hosting by: RealCode Corporation | Business License No:
            2024-CA-11111
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Business Information
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            1234 South Sunset Blvd, Los Angeles, CA 90028, USA
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Customer Support: 1-800-REALCODE
          </Typography>
        </Box>

        <Box sx={{ mt: 8, textAlign: "center", color: "gray.400" }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} RealCode, Inc. All rights
            reserved.
          </Typography>
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
