import { Typography, Box, SxProps, Theme, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface SectionTitleProps {
  title: ReactNode;
  subtitle?: ReactNode;
  titleSx?: SxProps<Theme>;
  subtitleSx?: SxProps<Theme>;
}

const SectionTitle = ({
  title,
  subtitle,
  titleSx,
  subtitleSx,
}: SectionTitleProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        sx={{
          mb: 1,
          fontWeight: "bold",
          fontSize: { xs: "1.6em", sm: "2rem" },
          ...theme.applyStyles("light", {
            color: "text.primary",
          }),
          ...theme.applyStyles("dark", {
            color: "#f5f5f5",
          }),
          ...(titleSx || {}),
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            fontWeight: 300,
            ...theme.applyStyles("light", {
              color: "text.secondary",
            }),
            ...theme.applyStyles("dark", {
              color: "#b0b0b0",
            }),
            ...(subtitleSx || {}),
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionTitle;
