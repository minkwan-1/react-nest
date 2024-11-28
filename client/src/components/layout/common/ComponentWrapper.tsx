import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

interface ComponentWrapperProps extends BoxProps {
  children: ReactNode;
}

const ComponentWrapper = ({
  children,
  sx,
  ...props
}: ComponentWrapperProps) => {
  return (
    <Box
      sx={{
        maxWidth: "1200px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default ComponentWrapper;
