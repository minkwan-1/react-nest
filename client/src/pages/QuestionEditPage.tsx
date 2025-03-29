import React, { useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { PageContainer, ComponentWrapper } from "../components/layout/common";
import {
  TitleField,
  ContentField,
  TagsField,
  PreviewButton,
  SubmitButton,
} from "../components/edit";
import AWS from "aws-sdk";

export default function QuestionEditPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  // AWS S3 설정
  AWS.config.update({
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    region: import.meta.env.VITE_AWS_REGION,
  });

  const s3 = new AWS.S3();

  // base64 데이터를 파일로 변환하는 함수
  const convertBase64ToOriginal = async (src: string) => {
    const base = atob(src.split(",")[1]);
    const blob = Uint8Array.from(base, (char) => char.charCodeAt(0));
    return new File([blob], `image-${Date.now()}.jpeg`, { type: "image/jpeg" });
  };

  const convertBase64ToWebPFileWithFallback = async (
    base64: string
  ): Promise<File> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(convertBase64ToOriginal(base64));
          return;
        }

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const webpFile = new File([blob], `image-${Date.now()}.webp`, {
                type: "image/webp",
              });
              resolve(webpFile);
            } else {
              resolve(convertBase64ToOriginal(base64));
            }
          },
          "image/webp",
          0.8
        );
      };

      img.onerror = () => resolve(convertBase64ToOriginal(base64));
    });
  };

  const uploadFileToS3 = async (file: File) => {
    const params = {
      Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
      Key: `images/${file.name}`,
      Body: file,
      ContentType: file.type,
    };

    return new Promise<string>((resolve, reject) => {
      s3.upload(
        params,
        (
          err: Error | null,
          data: AWS.S3.ManagedUpload.SendData | undefined
        ) => {
          if (err) {
            reject(err);
          } else {
            resolve(data?.Location || "");
          }
        }
      );
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const images = doc.querySelectorAll("img");

    for (const img of images) {
      if (img.src.startsWith("data:image")) {
        try {
          const file = await convertBase64ToWebPFileWithFallback(img.src);
          const uploadURL = await uploadFileToS3(file);
          img.src = uploadURL;
        } catch (error) {
          console.error("Error processing image:", error);
        }
      }
    }

    try {
      const response = await axios.post("http://localhost:3000/questions", {
        title,
        content: doc.getElementsByTagName("body")[0].innerHTML,
        tags,
      });

      console.log("Question submitted:", response.data);
      alert("Question submitted successfully!");

      setTitle("");
      setContent("");
      setTags([]);
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("Failed to submit the question.");
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTags(input.split(",").map((tag) => tag.trim()));
  };

  return (
    <PageContainer>
      <ComponentWrapper>
        <Box sx={{ padding: 3, maxWidth: 1200, mx: "auto" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: (theme) => ({
                ...theme.applyStyles("light", {
                  color: "black",
                }),
                ...theme.applyStyles("dark", {
                  color: "white",
                }),
              }),
              fontSize: "36px",
              fontWeight: "bold",
              marginBottom: 2,
            }}
          >
            질문 등록하기
          </Typography>

          <form onSubmit={handleSubmit}>
            <TitleField title={title} setTitle={setTitle} />
            <ContentField content={content} setContent={setContent} />
            <TagsField tags={tags} handleTagsChange={handleTagsChange} />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <PreviewButton
                previewMode={previewMode}
                setPreviewMode={setPreviewMode}
              />
              <SubmitButton />
            </Box>
          </form>
        </Box>
      </ComponentWrapper>
    </PageContainer>
  );
}
