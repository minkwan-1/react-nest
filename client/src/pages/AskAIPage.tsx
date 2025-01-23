import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { PageContainer, ComponentWrapper } from "../components/layout/common";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const AskAIPage = () => {
  const [search, setSearch] = useState("");
  const [responses, setResponses] = useState<string[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = () => {
    // AI의 응답을 시뮬레이션 (실제 API 요청 로직으로 교체 가능)
    setResponses([...responses, search]);
    setSearch("");
  };

  return (
    <PageContainer>
      <ComponentWrapper sx={{ padding: 2 }}>
        <Typography
          sx={{
            color: "black",
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: 3,
            textAlign: "center",
          }}
        >
          무엇을 도와드릴까요?
        </Typography>

        {/* 채팅 UI */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginBottom: 3,
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          {responses.map((response, index) => (
            <Paper
              key={index}
              sx={{
                padding: 2,
                backgroundColor: index % 2 === 0 ? "#f1f1f1" : "#03cb84",
                color: index % 2 === 0 ? "black" : "white",
                borderRadius: 2,
                maxWidth: "80%",
                alignSelf: index % 2 === 0 ? "flex-start" : "flex-end",
              }}
            >
              {response}
            </Paper>
          ))}
        </Box>

        {/* 검색 필드 */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Pullim에서 배운 지식을 AI에게 질문해보세요."
            value={search}
            onChange={handleSearchChange}
            onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit()}
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
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: "#03cb84",
              "&:hover": {
                bgcolor: "#02b97b",
              },
            }}
            onClick={handleSearchSubmit}
          >
            물어보기
          </Button>
        </Box>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default AskAIPage;
