import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Divider,
  useTheme,
  Container,
  Alert,
  Fade,
  Chip,
  Stack,
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
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function QuestionEditPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const theme = useTheme();

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
      setSuccess(true);

      setTimeout(() => {
        setTitle("");
        setContent("");
        setTags([]);
        setActiveStep(0);
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("Failed to submit the question.");
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTags(
      input
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag)
    );
  };

  return (
    <PageContainer>
      <ComponentWrapper>
        <Container maxWidth="lg">
          <Box sx={{ pt: 4, pb: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <EditNoteIcon
                sx={{
                  fontSize: 40,
                  mr: 2,
                  color: theme.palette.mode === "dark" ? "#03cb84" : "#03cb84",
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  ...theme.applyStyles("light", { color: "#212121" }),
                  ...theme.applyStyles("dark", { color: "#ffffff" }),
                  fontSize: { xs: "28px", md: "36px" },
                  fontWeight: "bold",
                }}
              >
                질문 등록하기
              </Typography>
            </Box>

            <Paper
              elevation={theme.palette.mode === "dark" ? 0 : 2}
              sx={{
                p: 4,
                borderRadius: 2,
                ...theme.applyStyles("light", { backgroundColor: "#ffffff" }),
                ...theme.applyStyles("dark", {
                  backgroundColor: "#333333",
                  border: "1px solid #444444",
                }),
              }}
            >
              {success ? (
                <Fade in={success}>
                  <Alert
                    severity="success"
                    sx={{
                      mb: 3,
                      fontSize: "16px",
                      "& .MuiAlert-icon": {
                        fontSize: "24px",
                      },
                    }}
                  >
                    질문이 성공적으로 등록되었습니다!
                  </Alert>
                </Fade>
              ) : (
                <Stepper
                  activeStep={activeStep}
                  alternativeLabel
                  sx={{
                    mb: 4,
                    "& .MuiStepLabel-root .Mui-completed": {
                      color: "#03cb84",
                    },
                    "& .MuiStepLabel-root .Mui-active": {
                      color: "#03cb84",
                    },
                  }}
                >
                  <Step>
                    <StepLabel>제목 작성</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>내용 작성</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>태그 추가</StepLabel>
                  </Step>
                </Stepper>
              )}

              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 4 }}>
                  <TitleField
                    title={title}
                    setTitle={(value) => {
                      setTitle(value);
                      if (value && activeStep === 0) setActiveStep(1);
                    }}
                  />
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ mb: 4 }}>
                  <ContentField
                    content={content}
                    setContent={(value) => {
                      setContent(value);
                      if (value && activeStep === 1) setActiveStep(2);
                    }}
                  />
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ mb: 4 }}>
                  <TagsField tags={tags} handleTagsChange={handleTagsChange} />

                  {tags.length > 0 && (
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ mt: 2, flexWrap: "wrap", gap: 1 }}
                    >
                      {tags.map(
                        (tag, index) =>
                          tag && (
                            <Chip
                              key={index}
                              label={tag}
                              color="primary"
                              variant="outlined"
                              sx={{
                                borderColor: "#03cb84",
                                color:
                                  theme.palette.mode === "dark"
                                    ? "#03cb84"
                                    : "#03cb84",
                                backgroundColor:
                                  theme.palette.mode === "dark"
                                    ? "rgba(3, 203, 132, 0.08)"
                                    : "rgba(3, 203, 132, 0.05)",
                                mb: 1,
                              }}
                              onDelete={() => {
                                const newTags = [...tags];
                                newTags.splice(index, 1);
                                setTags(newTags);
                              }}
                            />
                          )
                      )}
                    </Stack>
                  )}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 5,
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
