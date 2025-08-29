import { Typography, Box, Chip } from "@mui/material";

interface InterestAreaProps {
  interests: string[];
}

const InterestArea: React.FC<InterestAreaProps> = ({ interests }) => {
  const koreanContent = {
    interests: "관심 분야",
  };

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <Typography
        variant="subtitle2"
        fontWeight="bold"
        sx={{ width: "100%", textAlign: "left", mb: 1 }}
      >
        {koreanContent.interests}
      </Typography>

      {interests && interests.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.5,
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          {interests.slice(0, 8).map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              variant="outlined"
              sx={{
                fontSize: "0.75rem",
                "&:hover": {
                  borderColor: "#b8dae1",
                },
              }}
            />
          ))}
          {interests.length > 8 && (
            <Chip
              label={`+${interests.length - 8}`}
              size="small"
              sx={{
                fontSize: "0.75rem",
              }}
            />
          )}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
            p: 3,
          }}
        >
          <Typography variant="body2" fontWeight={500}>
            우측 하단에 위치한 편집 버튼을 통해, 관심 분야를 추가해 보세요.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default InterestArea;
