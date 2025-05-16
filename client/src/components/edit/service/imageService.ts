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

  async convertBase64ToOriginal(src: string): Promise<File> {
    const base = atob(src.split(",")[1]);

    const blob = Uint8Array.from(base, (char) => char.charCodeAt(0));

    return new File([blob], `image-${Date.now()}.jpeg`, { type: "image/jpeg" });
  }

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

  async processContentImages(content: string): Promise<string> {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const images = doc.querySelectorAll("img");

    for (const img of images) {
      if (img.src.startsWith("data:image")) {
        try {
          const file = await this.convertBase64ToWebPFileWithFallback(img.src);
          const uploadURL = await this.uploadFileToS3(file);
          img.src = uploadURL;
        } catch (error) {
          console.error("Error processing image:", error);
        }
      }
    }

    return doc.getElementsByTagName("body")[0].innerHTML;
  }
}

export const imageService = new ImageService();
