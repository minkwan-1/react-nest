import { marked } from "marked";
import DOMPurify from "dompurify";

export const convertMarkdownToHtml = (markdown: string): string => {
  try {
    const renderer = new marked.Renderer();

    const options = {
      breaks: true,
      gfm: true,
      renderer: renderer,
    };

    let rawHtml: string;

    try {
      const result = marked.parse(markdown, options);
      rawHtml = typeof result === "string" ? result : String(result);
    } catch {
      rawHtml = String(marked(markdown, options));
    }

    const cleanHtml = DOMPurify.sanitize(rawHtml, {
      ALLOWED_TAGS: [
        "p",
        "br",
        "strong",
        "em",
        "u",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "ul",
        "ol",
        "li",
        "blockquote",
        "pre",
        "code",
        "a",
        "img",
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
        "hr",
        "del",
        "ins",
      ],
      ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "rel"],
    });

    return String(cleanHtml);
  } catch (error) {
    console.error("마크다운 변환 실패:", error);
    return markdown;
  }
};

export const convertMarkdownToHtmlSafe = (markdown: string): string => {
  try {
    const html = markdown

      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")

      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")

      .replace(/\[([^\]]*)\]\(([^)]*)\)/gim, '<a href="$2">$1</a>')

      .replace(/```([^`]*)```/gim, "<pre><code>$1</code></pre>")
      .replace(/`([^`]*)`/gim, "<code>$1</code>")

      .replace(/\n/gim, "<br>");

    return String(
      DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
          "p",
          "br",
          "strong",
          "em",
          "u",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "ul",
          "ol",
          "li",
          "blockquote",
          "pre",
          "code",
          "a",
          "img",
          "table",
          "thead",
          "tbody",
          "tr",
          "th",
          "td",
          "hr",
          "del",
          "ins",
        ],
        ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "rel"],
      })
    );
  } catch (error) {
    console.error("마크다운 변환 실패:", error);
    return markdown;
  }
};

export const convertMarkdownToHtmlComplete = (markdown: string): string => {
  try {
    let html = markdown

      .replace(
        /```(\w+)?\n([\s\S]*?)```/gim,
        '<pre><code class="language-$1">$2</code></pre>'
      )
      .replace(/```([\s\S]*?)```/gim, "<pre><code>$1</code></pre>")

      .replace(/`([^`]+)`/gim, "<code>$1</code>")

      .replace(/^#### (.*$)/gim, "<h4>$1</h4>")
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")

      .replace(/\*\*\*(.*?)\*\*\*/gim, "<strong><em>$1</em></strong>")
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")

      .replace(/~~(.*?)~~/gim, "<del>$1</del>")

      .replace(
        /\[([^\]]*)\]\(([^)]*)\)/gim,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
      )

      .replace(/!\[([^\]]*)\]\(([^)]*)\)/gim, '<img src="$2" alt="$1" />')

      .replace(/^\* (.*$)/gim, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/gims, "<ul>$1</ul>")

      .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")

      .replace(/^---$/gim, "<hr>")
      .replace(/^\*\*\*$/gim, "<hr>")

      .replace(/\n\n/gim, "</p><p>")
      .replace(/^(.+)$/gim, "<p>$1</p>")

      .replace(/\n/gim, "<br>");

    html = html
      .replace(/<\/p><p><\/p><p>/gim, "</p><p>")
      .replace(/<p><\/p>/gim, "")
      .replace(/<ul><li>/gim, "<ul><li>")
      .replace(/<\/li><\/ul>/gim, "</li></ul>");

    return String(
      DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
          "p",
          "br",
          "strong",
          "em",
          "u",
          "del",
          "ins",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "ul",
          "ol",
          "li",
          "blockquote",
          "hr",
          "pre",
          "code",
          "a",
          "img",
          "table",
          "thead",
          "tbody",
          "tr",
          "th",
          "td",
        ],
        ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "rel", "class"],
      })
    );
  } catch (error) {
    console.error("마크다운 변환 실패:", error);
    return markdown;
  }
};
