import { Card, CardContent, Divider } from "@mui/material";

import { AnswerCardProps } from "@domains/detail/types";
import { AnswerBadge, AnswerHeader, AnswerContent } from "./index";

const AnswerCard = ({ answer }: AnswerCardProps) => {
  return (
    <Card
      sx={{
        mb: 4,
        borderRadius: 6,
        border: `1px solid #D3D3D3`,
        transition: "all 0.25s ease-in-out",
        position: "relative",
      }}
    >
      <AnswerBadge isAiAnswer={answer.isAiAnswer} />
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <AnswerHeader answer={answer} />
        <Divider
          sx={{
            my: 3,
            borderWidth: 1,
          }}
        />
        <AnswerContent answer={answer} />
      </CardContent>
    </Card>
  );
};

export default AnswerCard;
