import React from "react";
import { Box, Typography } from "@mui/material";

const TermSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Box sx={{ marginTop: "50px" }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1">{children}</Typography>
    </Box>
  );
};

export default TermSection;
