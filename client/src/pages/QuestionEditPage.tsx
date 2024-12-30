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
  const convertBase64ToFile = async (src: string) => {
    const res = await fetch(src);
    const blob = await res.blob();
    return new File([blob], `image-${Date.now()}.jpg`, { type: "image/jpeg" });
  };

  // 파일을 S3에 업로드하는 함수
  const uploadFileToS3 = async (file: File) => {
    const params = {
      Bucket: import.meta.env.VITE_AWS_BUCKET_NAME, // S3 버킷 이름
      Key: `images/${file.name}`, // 업로드할 파일의 키 (경로)
      Body: file, // 업로드할 파일
      ContentType: file.type, // 파일 타입 설정
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
            resolve(data?.Location || ""); // 업로드된 파일의 URL 반환
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

    // 이미지가 하나씩 처리
    for (const img of images) {
      if (img.src.startsWith("data:image")) {
        try {
          // base64 이미지를 파일로 변환
          const file = await convertBase64ToFile(img.src);

          // 파일을 S3에 업로드하고 URL을 가져옴
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
          <Typography variant="h4" gutterBottom>
            Edit Question
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
