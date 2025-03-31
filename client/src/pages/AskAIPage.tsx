import { useState } from "react";
import "highlight.js/styles/github-dark.css";
import { PageContainer, ComponentWrapper } from "../components/layout/common";
import {
  InputField,
  CodeHighlightStyles,
  PageTitle,
  ErrorCard,
  DisplayArea,
} from "@components/ask-ai";

const AskAIPage = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [conversation, setConversation] = useState<
    Array<{ type: "user" | "ai"; content: string }>
  >([]);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    // Add user message to conversation
    const userMessage = prompt.trim();
    setConversation([...conversation, { type: "user", content: userMessage }]);
    setPrompt("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/ask-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      if (!res.ok) {
        throw new Error("서버 오류가 발생했습니다");
      }

      const data = await res.json();

      // Save the raw response
      setResponse(data.result);

      // Add AI response to conversation
      // The ReactMarkdown component will handle the rendering
      setConversation((prev) => [
        ...prev,
        { type: "ai", content: data.result },
      ]);

      // Scroll to bottom of conversation
      setTimeout(() => {
        const conversationContainer = document.querySelector(
          ".conversation-container"
        );
        if (conversationContainer) {
          conversationContainer.scrollTop = conversationContainer.scrollHeight;
        }
      }, 100);
    } catch (err: unknown) {
      console.error(err);
      setError("AI 응답 가져오기에 실패했습니다. 나중에 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPrompt("");
    setResponse("");
    setConversation([]);
    setError("");
  };

  console.log(response);
  return (
    <PageContainer>
      <ComponentWrapper
        sx={{
          padding: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* CodeHighlightStyles.tsx */}
        <CodeHighlightStyles />

        {/* PageTitle.tsx */}
        <PageTitle />

        {/* DisplayArea.tsx */}
        <DisplayArea conversation={conversation} loading={loading} />

        {/* ErrorCard.tsx */}
        {error && <ErrorCard error={error} />}

        {/* Input Area */}
        <InputField
          prompt={prompt}
          setPrompt={setPrompt}
          handleSubmit={handleSubmit}
          handleReset={handleReset}
          loading={loading}
        />
      </ComponentWrapper>
    </PageContainer>
  );
};

export default AskAIPage;
