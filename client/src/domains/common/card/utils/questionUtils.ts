export const stripHtml = (html: string): string => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export const getExcerpt = (html: string, maxLength = 100): string => {
  const text = stripHtml(html);
  return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
};

export const extractImageFromContent = (html: string): string | null => {
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
  const match = html.match(imgRegex);
  return match ? match[1] : null;
};
