import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Container,
  useTheme,
  alpha,
  Paper,
} from "@mui/material";
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
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const mainColor = "#03cb84";

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
        <Container maxWidth="lg" disableGutters>
          <Box
            sx={{
              position: "relative",
              padding: { xs: 2, sm: 3 },
              maxWidth: 1200,
              mx: "auto",
              zIndex: 1,
            }}
          >
            {/* Background elements */}
            <Box
              sx={{
                position: "absolute",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${alpha(
                  mainColor,
                  0.15
                )} 0%, ${alpha(mainColor, 0.02)} 70%, transparent 100%)`,
                top: "-150px",
                right: "-100px",
                zIndex: -1,
                filter: "blur(30px)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                width: "250px",
                height: "250px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${alpha(
                  mainColor,
                  0.1
                )} 0%, ${alpha(mainColor, 0.02)} 70%, transparent 100%)`,
                bottom: "0%",
                left: "-100px",
                zIndex: -1,
                filter: "blur(35px)",
              }}
            />

            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "28px", sm: "36px" },
                  background: `linear-gradient(135deg, ${mainColor} 0%, #02b279 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.5px",
                  mb: 2,
                  position: "relative",
                  display: "inline-block",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: "-8px",
                    width: "60px",
                    height: "4px",
                    borderRadius: "2px",
                    background: `linear-gradient(90deg, ${mainColor} 0%, #02b279 100%)`,
                  },
                }}
              >
                질문 등록하기
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: isDarkMode ? alpha("#fff", 0.7) : alpha("#000", 0.6),
                  fontSize: { xs: "15px", sm: "16px" },
                  mt: 3,
                }}
              >
                궁금한 점을 명확하게 작성하여 커뮤니티에서 도움을 받아보세요.
              </Typography>
            </Box>

            {/* Form */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: "16px",
                backgroundColor: isDarkMode ? alpha("#222", 0.7) : "#ffffff",
                boxShadow: isDarkMode
                  ? "0 8px 20px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset"
                  : "0 8px 30px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.02) inset",
                backdropFilter: "blur(10px)",
                padding: { xs: 2, sm: 4 },
                overflow: "hidden",
              }}
            >
              <form onSubmit={handleSubmit}>
                <TitleField title={title} setTitle={setTitle} />

                {previewMode ? (
                  <Box
                    sx={{
                      mb: 3,
                      mt: 4,
                      padding: 3,
                      borderRadius: "12px",
                      backgroundColor: isDarkMode
                        ? alpha("#fff", 0.05)
                        : alpha("#f5f5f5", 0.7),
                      border: `1px solid ${
                        isDarkMode ? alpha("#fff", 0.1) : alpha("#000", 0.1)
                      }`,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        fontWeight: 600,
                        color: mainColor,
                        display: "flex",
                        alignItems: "center",
                        "&::before": {
                          content: '""',
                          display: "inline-block",
                          width: "4px",
                          height: "16px",
                          borderRadius: "2px",
                          marginRight: "10px",
                          background: `linear-gradient(to bottom, ${mainColor}, #02b279)`,
                        },
                      }}
                    >
                      미리보기
                    </Typography>
                    <div
                      className="ql-editor"
                      dangerouslySetInnerHTML={{
                        __html: content,
                      }}
                      style={{
                        overflow: "auto",
                        minHeight: "250px",
                      }}
                    />
                  </Box>
                ) : (
                  <ContentField content={content} setContent={setContent} />
                )}

                <TagsField tags={tags} handleTagsChange={handleTagsChange} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 4,
                    flexDirection: { xs: "column", sm: "row" },
                    gap: { xs: 2, sm: 0 },
                  }}
                >
                  <PreviewButton
                    previewMode={previewMode}
                    setPreviewMode={setPreviewMode}
                  />
                  <SubmitButton />
                </Box>
              </form>
            </Paper>
          </Box>
        </Container>
      </ComponentWrapper>
    </PageContainer>
  );
}
