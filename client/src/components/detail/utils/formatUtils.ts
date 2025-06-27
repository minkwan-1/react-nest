export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getUserName = (userId: string, isAi: boolean = false) => {
  if (isAi || userId === "ai-assistant") return "AI Assistant";
  return `사용자 ${userId.slice(0, 8)}`;
};
