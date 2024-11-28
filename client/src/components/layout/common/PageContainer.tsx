import { ReactNode } from "react";
import { Box, SxProps, Theme } from "@mui/material";

import Appbar from "../appbar/Appbar";
import Footer from "../footer/Footer";

interface PageContainerProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

const PageContainer = ({ children, sx }: PageContainerProps) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      <Appbar />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default PageContainer;
