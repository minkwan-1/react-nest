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
    console.log({ base, blob });
    return new File([blob], `image-${Date.now()}.jpeg`, { type: "image/jpeg" });
  };

  const convertBase64ToWebPFileWithFallback = async (
    base64: string
  ): Promise<File> => {
    return new Promise((resolve) => {
      // 1. Image 객체 생성 및 base64 설정
      const img = new Image();
      img.src = base64;

      // 2. 이미지 로드 성공 시 처리
      img.onload = () => {
        // 2-1. 캔버스 생성 및 크기 설정
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        // 2-2. 캔버스 컨텍스트 가져오기
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          console.error("Canvas context is not available.");
          // 캔버스 컨텍스트를 사용할 수 없는 경우 원본 이미지로 반환
          resolve(convertBase64ToOriginal(base64)); // 폴백: 원본 이미지 반환
          return;
        }

        // 2-3. 이미지 캔버스에 그리기
        ctx.drawImage(img, 0, 0);

        // 2-4. WebP 변환 시도
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // WebP 변환 성공
              const webpFile = new File([blob], `image-${Date.now()}.webp`, {
                type: "image/webp",
              });
              resolve(webpFile);
            } else {
              console.warn("WebP conversion failed. Returning original image.");
              // WebP 변환 실패 시 원본 이미지 반환
              resolve(convertBase64ToOriginal(base64)); // 폴백: 원본 이미지 반환
            }
          },
          "image/webp",
          0.8 // 품질 설정 (0.8 = 80%)
        );
      };

      // 3. 이미지 로드 실패 시 처리
      img.onerror = (err) => {
        console.error("Image loading failed:", err);
        // 이미지 로드 실패 시 원본 이미지 반환
        resolve(convertBase64ToOriginal(base64)); // 폴백: 원본 이미지 반환
      };
    });
  };

  // 파일을 S3에 업로드하는 함수
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
            console.error("S3 Upload Error:", err);
            reject(err);
          } else {
            console.log("File uploaded successfully:", data);
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
          // convertBase64ToWebPFileWithFallback()
          const file = await convertBase64ToWebPFileWithFallback(img.src);

          // uploadFileToS3()
          const uploadURL = await uploadFileToS3(file);
          img.src = uploadURL;
        } catch (error) {
          console.error("Error processing image:", error);
        }
      }
    }
    console.log(doc.getElementsByTagName("body")[0].innerHTML);
    // 처리된 콘텐츠와 함께 서버에 데이터 전송
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
        <Box sx={{ padding: 3 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: (theme) => {
                return {
                  ...theme.applyStyles("light", {
                    color: "black",
                  }),
                  ...theme.applyStyles("dark", {
                    color: "white",
                  }),
                };
              },
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
            <PreviewButton
              previewMode={previewMode}
              setPreviewMode={setPreviewMode}
            />
            <SubmitButton />
          </form>
        </Box>
      </ComponentWrapper>
    </PageContainer>
  );
}
