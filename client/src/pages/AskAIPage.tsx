import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { PageContainer, ComponentWrapper } from "../components/layout/common";
import SearchIcon from "@mui/icons-material/Search";
import { marked } from "marked";

const AskAIPage = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/ask-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();
      setResponse(data.result);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch AI response. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <ComponentWrapper sx={{ padding: 2 }}>
        <Typography
          sx={{
            color: "black",
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: 2,
          }}
        >
          Ask AI
        </Typography>

        {/* 검색바 */}
        <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
          <TextField
            variant="outlined"
            placeholder="Enter your prompt"
            sx={{
              flexGrow: 1,
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#03cb84",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#03cb84",
                },
              },
            }}
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: "#03cb84",
              "&:hover": {
                bgcolor: "#028a66",
              },
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            Submit
          </Button>
        </Box>

        {/* 결과 표시 */}
        <Card sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: 1 }}>
            {loading && <Typography>Loading...</Typography>}
            {error && <Typography color="error">{error}</Typography>}
            {response && (
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: "pre-wrap",
                  fontFamily: "monospace",
                }}
                dangerouslySetInnerHTML={{
                  __html: marked(response),
                }}
              />
            )}
          </CardContent>
          <CardActions sx={{ justifyContent: "center", padding: 2 }}>
            <Button
              size="small"
              sx={{ color: "#03cb84" }}
              onClick={() => setPrompt("")}
            >
              Clear
            </Button>
          </CardActions>
        </Card>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default AskAIPage;
