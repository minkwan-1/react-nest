import { ReactNode } from "react";
import { Box, BoxProps } from "@mui/material";

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
        margin: "0 auto",
        flexGrow: 1,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default ComponentWrapper;
