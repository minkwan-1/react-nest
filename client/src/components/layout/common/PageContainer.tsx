import { Box } from "@mui/material";
import Appbar from "../appbar/Appbar";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const PageContainer = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Appbar />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Box>
  );
};

export default PageContainer;
