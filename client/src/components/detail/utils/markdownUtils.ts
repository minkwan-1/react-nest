// utils/markdownUtils.ts
import { marked } from "marked";
import DOMPurify from "dompurify";

export const convertMarkdownToHtml = (markdown: string): string => {
  try {
    // 최신 marked 버전을 위한 설정
    const renderer = new marked.Renderer();

    // marked 옵션 설정
    const options = {
      breaks: true,
      gfm: true,
      renderer: renderer,
    };

    // 동기적으로 마크다운 변환
    let rawHtml: string;

    try {
      // marked.parse 사용 (최신 버전)
      const result = marked.parse(markdown, options);
      rawHtml = typeof result === "string" ? result : String(result);
    } catch {
      // 구버전 marked를 위한 fallback
      rawHtml = String(marked(markdown, options));
    }

    // DOMPurify로 sanitize
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
    return markdown; // 실패 시 원본 반환
  }
};

// 더 안전한 대안 (타입 오류가 계속 발생하는 경우)
export const convertMarkdownToHtmlSafe = (markdown: string): string => {
  try {
    // 기본적인 마크다운 변환만 수행
    const html = markdown
      // 헤더 변환
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      // 볼드/이탤릭 변환
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      // 링크 변환 - 이스케이프 수정
      .replace(/\[([^\]]*)\]\(([^)]*)\)/gim, '<a href="$2">$1</a>')
      // 코드 블록 변환
      .replace(/```([^`]*)```/gim, "<pre><code>$1</code></pre>")
      .replace(/`([^`]*)`/gim, "<code>$1</code>")
      // 줄바꿈 변환
      .replace(/\n/gim, "<br>");

    // DOMPurify로 안전하게 처리
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

// 더 완전한 마크다운 변환 함수 (필요한 경우)
export const convertMarkdownToHtmlComplete = (markdown: string): string => {
  try {
    let html = markdown
      // 코드 블록 (먼저 처리)
      .replace(
        /```(\w+)?\n([\s\S]*?)```/gim,
        '<pre><code class="language-$1">$2</code></pre>'
      )
      .replace(/```([\s\S]*?)```/gim, "<pre><code>$1</code></pre>")

      // 인라인 코드
      .replace(/`([^`]+)`/gim, "<code>$1</code>")

      // 헤더
      .replace(/^#### (.*$)/gim, "<h4>$1</h4>")
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")

      // 볼드, 이탤릭
      .replace(/\*\*\*(.*?)\*\*\*/gim, "<strong><em>$1</em></strong>")
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")

      // 취소선
      .replace(/~~(.*?)~~/gim, "<del>$1</del>")

      // 링크 (이스케이프 수정)
      .replace(
        /\[([^\]]*)\]\(([^)]*)\)/gim,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
      )

      // 이미지
      .replace(/!\[([^\]]*)\]\(([^)]*)\)/gim, '<img src="$2" alt="$1" />')

      // 목록 (간단한 버전)
      .replace(/^\* (.*$)/gim, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/gims, "<ul>$1</ul>")

      // 인용구
      .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")

      // 수평선
      .replace(/^---$/gim, "<hr>")
      .replace(/^\*\*\*$/gim, "<hr>")

      // 단락 (빈 줄로 구분)
      .replace(/\n\n/gim, "</p><p>")
      .replace(/^(.+)$/gim, "<p>$1</p>")

      // 줄바꿈
      .replace(/\n/gim, "<br>");

    // 중복된 태그 정리
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
