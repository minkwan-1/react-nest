import { Typography } from "@mui/material";

const CardSubtitle = () => {
  return (
    <Typography
      variant="body2"
      sx={{
        border: "1px solid red",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
        lineHeight: 1.5,
        whiteSpace: "pre-wrap",
      }}
    >
      비동기 처리를 리액트에서 어떻게 처리하는지 모르겠어요 ㅜㅜ
    </Typography>
  );
};

export default CardSubtitle;
