import { Button, useTheme } from "@mui/material";

interface FilteringButtonProps {
  label: string;
  icon: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

const FilteringButton = ({
  label,
  icon,
  selected,
  onClick,
}: FilteringButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      onClick={onClick}
      sx={{
        color: selected ? "#c5a3d5" : "#616161",
        border: "1px solid #E0E0E0",
        borderRadius: 6,
        textTransform: "none",
        px: 2,
        py: 0.8,
        fontWeight: 500,
        minWidth: "85px",
        flexShrink: 0,
        backgroundColor: selected
          ? theme.palette.mode === "light"
            ? "#F0FBF7"
            : "#333333"
          : "transparent",
        "&:hover": {
          backgroundColor:
            theme.palette.mode === "light" ? "#F5F5F5" : "#4F4F4F",
          borderColor: "#c5a3d5",
        },
      }}
      startIcon={icon}
    >
      {label}
    </Button>
  );
};

export default FilteringButton;
