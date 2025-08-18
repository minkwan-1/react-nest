import { Box, SxProps, Theme, useTheme } from "@mui/material";

interface AppbarWrapperProps {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
}

const AppbarWrapper = ({ sx, children }: AppbarWrapperProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: "80px",
        position: "sticky",
        top: 0,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        ...theme.applyStyles("light", {
          backgroundColor: "#f8f8f8",
          color: "black",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
          borderBottom: "1px solid #E0E0E0",
        }),
        ...theme.applyStyles("dark", {
          backgroundColor: "#121212",
          color: "white",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          borderBottom: "1px solid #616161",
        }),
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default AppbarWrapper;
