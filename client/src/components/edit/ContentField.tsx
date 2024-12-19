import React, { useMemo, Suspense } from "react";
import { Box, Typography } from "@mui/material";
import DOMPurify from "dompurify";
import QuillEditor from "./QuillEditor";

interface ContentFieldProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const ContentField: React.FC<ContentFieldProps> = ({ content, setContent }) => {
  const Quill_Editor = useMemo(
    () => <QuillEditor value={content} onChange={setContent} />,
    [content, setContent]
  );

  return (
    <Box mb={2}>
      <Typography variant="h6">Content</Typography>
      <Suspense fallback={<div>Loading editor...</div>}>
        {Quill_Editor}
      </Suspense>

      {/* Preview Section */}
      <Box
        mt={4}
        p={2}
        border="1px solid #ccc"
        borderRadius="4px"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <Typography variant="subtitle1" gutterBottom>
          Preview
        </Typography>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content),
          }}
          style={{
            overflow: "hidden",
            whiteSpace: "pre-wrap",
          }}
        />
      </Box>
    </Box>
  );
};

export default ContentField;
