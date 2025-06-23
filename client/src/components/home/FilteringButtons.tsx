import { Box } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import FilteringButton from "./FilteringButton";
import { useState } from "react";

const FILTER_OPTIONS = [
  { label: "최신순", icon: <AccessTimeIcon sx={{ fontSize: 18 }} /> },
  { label: "답변순", icon: <CommentOutlinedIcon sx={{ fontSize: 18 }} /> },
];

const FilteringButtons = () => {
  const [selected, setSelected] = useState("최신순");

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        marginBottom: 4,
        overflowX: "auto",
        pb: 1,
        flexWrap: "nowrap",
        "&::-webkit-scrollbar": {
          height: "4px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#F5F5F5",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#BDBDBD",
          borderRadius: "10px",
        },
      }}
    >
      {FILTER_OPTIONS.map((option) => (
        <FilteringButton
          key={option.label}
          label={option.label}
          icon={option.icon}
          selected={selected === option.label}
          onClick={() => setSelected(option.label)}
        />
      ))}
    </Box>
  );
};

export default FilteringButtons;
