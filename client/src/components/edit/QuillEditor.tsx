import React, { useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImageResize } from "quill-image-resize-module-ts";

// 1. Import highlight.js and a stylesheet
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"; // Or any other theme you prefer

// 2. Configure highlight.js for desired languages
hljs.configure({
  languages: [
    "javascript",
    "python",
    "jsx",
    "tsx",
    "css",
    "html",
    "typescript",
    "java",
    "sql",
  ],
});

const Font = Quill.import("formats/font");
Font.whitelist = [
  "sans-serif",
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
];
Quill.register(Font, true);
Quill.register("modules/ImageResize", ImageResize);

interface QuillEditorProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const mainColor = "#b8dae1";

  const modules = {
    // 3. Add the syntax module for highlighting
    syntax: {
      highlight: (text: string) => hljs.highlightAuto(text).value,
    },
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: Font.whitelist }],
        [{ align: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        // 4. Add 'code-block' to the toolbar array
        ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
        [
          { list: "ordered" },
          { list: "bullet" },
          "link",
          { indent: "-1" },
          { indent: "+1" },
        ],
        [
          {
            color: [
              "#000000",
              "#e60000",
              "#ff9900",
              "#ffff00",
              "#008a00",
              "#0066cc",
              mainColor,
              "custom-color",
            ],
          },
          { background: [] },
        ],
        ["image", "video"],
        ["clean"],
      ],
    },
    ImageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  return (
    <ReactQuill
      ref={quillRef}
      value={value}
      onChange={onChange}
      modules={modules}
      theme="snow"
      placeholder="질문 내용을 자세히 작성하세요..."
      style={{ borderRadius: "8px", marginBottom: "20px" }}
    />
  );
};

export default QuillEditor;
