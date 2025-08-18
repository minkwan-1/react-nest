import { Box } from "@mui/material";

type CircleDecorationProps = {
  size: number;
  color: string;
  position: "topRight" | "bottomLeft";
};

const CircleDecoration = ({ size, color, position }: CircleDecorationProps) => {
  const styles =
    position === "topRight"
      ? { top: `-${size / 3}px`, right: `-${size / 3}px` }
      : { bottom: `-${size / 3}px`, left: `-${size / 3}px` };

  return (
    <Box
      sx={{
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: color,
        zIndex: 0,
        ...styles,
      }}
    />
  );
};

export default CircleDecoration;
