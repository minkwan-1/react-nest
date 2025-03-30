import { Divider, useTheme, DividerProps } from "@mui/material";

interface StyledDividerProps extends DividerProps {
  spacing?: number | string;
}

const OrDivider = ({
  spacing = 3,
  orientation = "horizontal",
  ...props
}: StyledDividerProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Divider
      orientation={orientation}
      sx={{
        my: spacing,
        ...theme.applyStyles("light", {
          borderColor: "#00000008",
        }),
        ...theme.applyStyles("dark", {
          borderColor: "#ffffff15",
        }),
        ...props.sx,
      }}
      {...props}
    />
  );
};

export default OrDivider;
