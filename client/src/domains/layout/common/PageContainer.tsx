import { ReactNode } from "react";
import { Box, BoxProps } from "@mui/material";
import Appbar from "@domains/layout/appbar/Appbar";

type LayoutProps = {
  children: ReactNode;
  sx?: BoxProps["sx"];
};

const PageContainer = ({ children, sx }: LayoutProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        ...sx,
      }}
    >
      <Appbar />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Box>
  );
};

export default PageContainer;
