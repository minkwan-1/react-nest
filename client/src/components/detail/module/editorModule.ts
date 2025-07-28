import hljs from "highlight.js";

// syntax highlighting을 적용할 언어들을 미리 등록해두면 성능에 도움이 됩니다.
hljs.configure({
  languages: ["javascript", "python", "jsx", "tsx", "css", "html"],
});

export const editorModule = {
  syntax: {
    highlight: (text: string) => hljs.highlightAuto(text).value,
  },
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"], // 'code-block' 추가
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};
