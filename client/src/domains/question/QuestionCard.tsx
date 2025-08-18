import { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Button,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import {
  ArrowDropUp,
  ArrowDropDown,
  Visibility,
  Comment,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface QuestionCardProps {
  id: number;
  title: string;
  votes: number;
  answers: number;
  views: number;
  tags: string[];
  askedBy: string;
  askedAt: string;
}

export function QuestionCard({
  id,
  title,
  votes,
  answers,
  views,
  tags,
  askedBy,
  askedAt,
}: QuestionCardProps) {
  const [voteCount, setVoteCount] = useState(votes);
  const navigate = useNavigate();

  const handleVote = (increment: number) => {
    setVoteCount((prev) => prev + increment);
  };

  const navigateToQuestion = () => {
    navigate(`/questions/${id}`);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ display: "flex", alignItems: "flex-start" }}>
        {/* Vote Section */}
        <Box sx={{ textAlign: "center", mr: 3 }}>
          <Button
            size="small"
            onClick={() => handleVote(1)}
            sx={{ minWidth: "unset" }}
          >
            <ArrowDropUp />
          </Button>
          <Typography fontWeight="bold">{voteCount}</Typography>
          <Button
            size="small"
            onClick={() => handleVote(-1)}
            sx={{ minWidth: "unset" }}
          >
            <ArrowDropDown />
          </Button>
        </Box>
        {/* Content Section */}
        <Box sx={{ flex: 1 }}>
          <Box
            onClick={navigateToQuestion}
            sx={{
              cursor: "pointer",
              color: "primary.main",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            <Typography variant="h6">{title}</Typography>
          </Box>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            {tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Stack>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ display: "flex", alignItems: "center", mt: 2 }}
          >
            <Comment fontSize="small" sx={{ mr: 0.5 }} />
            {answers} answers
            <Visibility fontSize="small" sx={{ ml: 2, mr: 0.5 }} />
            {views} views
            <span style={{ marginLeft: "auto" }}>
              asked by {askedBy} on {askedAt}
            </span>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
