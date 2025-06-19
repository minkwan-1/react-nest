import AWS from "aws-sdk";

export class ImageService {
  private s3: AWS.S3;

  constructor() {
    AWS.config.update({
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
      region: import.meta.env.VITE_AWS_REGION,
    });

    this.s3 = new AWS.S3();
  }

  // Base64 문자열을 원본 JPEG 파일로 변환합니다.
  async convertBase64ToOriginal(src: string): Promise<File> {
    const base = atob(src.split(",")[1]);

    const blob = Uint8Array.from(base, (char) => char.charCodeAt(0));

    return new File([blob], `image-${Date.now()}.jpeg`, { type: "image/jpeg" });
  }

  // Base64 이미지를 WebP 파일로 변환하되, 실패 시 원본 JPEG으로 대체합니다.
  async convertBase64ToWebPFileWithFallback(base64: string): Promise<File> {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(this.convertBase64ToOriginal(base64));
          return;
        }

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              // const buffer = await blob.arrayBuffer();
              // const byteArray = new Uint8Array(buffer);
              // console.log("진짜 이진 데이터:", byteArray);

              const webpFile = new File([blob], `image-${Date.now()}.webp`, {
                type: "image/webp",
              });
              resolve(webpFile);
            } else {
              resolve(this.convertBase64ToOriginal(base64));
            }
          },
          "image/webp",
          0.8
        );
      };

      img.onerror = () => resolve(this.convertBase64ToOriginal(base64));
    });
  }

  // 파일을 AWS S3에 업로드하고 업로드된 URL을 반환합니다.
  async uploadFileToS3(file: File): Promise<string> {
    const params = {
      Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
      Key: `images/${file.name}`,
      Body: file,
      ContentType: file.type,
    };

    return new Promise<string>((resolve, reject) => {
      this.s3.upload(
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
  }

  // HTML 콘텐츠 내 Base64 이미지를 WebP로 변환하고 S3에 업로드하여 URL로 대체합니다.
  async processContentImages(content: string): Promise<string> {
    console.log("[processContentImages] 시작, content 길이:", content.length);

    const parser = new DOMParser();

    const doc = parser.parseFromString(content, "text/html");
    console.log("[processContentImages] HTML 파싱 완료");

    const images = doc.querySelectorAll("img");
    console.log(`[processContentImages] img 태그 개수: ${images.length}`);

    for (const [index, img] of images.entries()) {
      console.log(
        `[processContentImages] img #${index} src:`,
        img.src?.substring(0, 50)
      );

      if (img.src.startsWith("data:image")) {
        try {
          console.log(
            `[processContentImages] img #${index} Base64 이미지 발견, 변환 시작`
          );
          const file = await this.convertBase64ToWebPFileWithFallback(img.src);
          console.log(
            `[processContentImages] img #${index} WebP 변환 완료, 파일명: ${file.name}`
          );

          const uploadURL = await this.uploadFileToS3(file);
          console.log(
            `[processContentImages] img #${index} S3 업로드 완료, URL: ${uploadURL}`
          );

          img.src = uploadURL;
        } catch (error) {
          console.error(
            `[processContentImages] img #${index} 변환/업로드 중 오류:`,
            error
          );
        }
      }
    }

    const result = doc.getElementsByTagName("body")[0].innerHTML;
    console.log(
      "[processContentImages] 변환 완료된 콘텐츠 반환, 길이:",
      result.length
    );

    return result;
  }
}

export const imageService = new ImageService();
