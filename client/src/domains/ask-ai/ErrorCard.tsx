import { Card, CardContent, alpha, Typography, useTheme } from "@mui/material";
import React from "react";

interface ErrorCardProps {
  error: string | React.ReactNode;
}

const ErrorCard = ({ error }: ErrorCardProps) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 2,
        bgcolor: alpha(theme.palette.error.main, 0.1),
      }}
    >
      <CardContent sx={{ py: 1.5, px: 2, "&:last-child": { pb: 1.5 } }}>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ErrorCard;
