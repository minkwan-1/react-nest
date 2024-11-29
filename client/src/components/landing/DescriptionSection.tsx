import { Box, Typography, BoxProps } from "@mui/material";

interface DescriptionSectionProps extends BoxProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const DescriptionSection = ({
  title,
  description,
  children,
  ...boxProps
}: DescriptionSectionProps) => {
  return (
    <Box
      sx={{
        padding: "60px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
        borderTop: "1px solid #e0e0e0",
        ...boxProps.sx,
      }}
      {...boxProps}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {description}
      </Typography>
      {children && <Box>{children}</Box>}
    </Box>
  );
};

export default DescriptionSection;
