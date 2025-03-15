import { Box } from "@mui/material";
import Appbar from "../appbar/Appbar";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const PageContainer = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Appbar
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      />
      <Box sx={{ flexGrow: 1, mt: "40px" }}>{children}</Box>
    </Box>
  );
};

export default PageContainer;
