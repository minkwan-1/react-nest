// ComponentWrapper.tsx
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
        maxWidth: "800px",
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
