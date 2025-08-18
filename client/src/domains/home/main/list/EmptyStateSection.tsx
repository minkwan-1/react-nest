import { Box, Typography } from "@mui/material";

interface EmptyStateSectionProps {
  type: "loading" | "empty";
  message: string;
}

const EmptyStateSection = ({ type, message }: EmptyStateSectionProps) => {
  const defaultMessage =
    type === "loading" ? "로딩 중..." : "등록된 질문이 없습니다.";
  return (
    <Box sx={{ textAlign: "center", py: 4 }}>
      <Typography variant="body2" color="text.secondary">
        {message || defaultMessage}
      </Typography>
    </Box>
  );
};

export default EmptyStateSection;
