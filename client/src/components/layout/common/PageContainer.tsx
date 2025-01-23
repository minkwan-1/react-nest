// PageContainer.tsx
import { ReactNode } from "react";
import { Box } from "@mui/material";
import Appbar from "../appbar/Appbar";
import LeftSidebar from "../sidebar/LeftSidebar";
import RightSidebar from "../sidebar/RightSidebar";

type LayoutProps = {
  children: ReactNode;
};

const PageContainer = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* AppBar */}
      <Appbar
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      />

      {/* Main Content Layout */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          mt: "80px",
        }}
      >
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            bgcolor: "background.default",
            p: 3,
          }}
        >
          {children}
        </Box>

        {/* Right Sidebar */}
        <RightSidebar />
      </Box>
    </Box>
  );
};

export default PageContainer;
