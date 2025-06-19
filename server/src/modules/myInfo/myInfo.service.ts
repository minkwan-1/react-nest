import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyInfo } from './myInfo.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MyInfoService {
  private readonly logger = new Logger(MyInfoService.name);
  private readonly s3: AWS.S3;
  private readonly bucketName: string;

  constructor(
    @InjectRepository(MyInfo)
    private readonly myInfoRepository: Repository<MyInfo>,
    private configService: ConfigService,
  ) {
    // AWS S3 설정
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_REGION'),
    });

    this.bucketName = this.configService.get('AWS_BUCKET_NAME');
  }

  // myInfo 등록/수정 처리 (프로필 이미지 URL 포함)
  async upsert(
    userId: string,
    job: string,
    interests: string[],
    socialLinks: string[],
    profileImageUrl?: string,
  ): Promise<void> {
    const existing = await this.myInfoRepository.findOne({ where: { userId } });

    if (existing) {
      existing.job = job;
      existing.interests = interests;
      existing.socialLinks = socialLinks;

      // 프로필 이미지 URL이 제공되면 업데이트
      if (profileImageUrl !== undefined) {
        existing.profileImageUrl = profileImageUrl;
      }

      await this.myInfoRepository.save(existing);
    } else {
      const newMyInfo = {
        job,
        interests,
        socialLinks,
        profileImageUrl: profileImageUrl || null,
      };

      await this.myInfoRepository.save({ userId, ...newMyInfo });
    }
  }

  // myInfo 찾기
  async find(userId: string): Promise<MyInfo | null> {
    const entry = await this.myInfoRepository.findOne({ where: { userId } });
    return entry;
  }

  // 프로필 이미지 업로드
  async uploadProfileImage(
    file: Express.Multer.File,
    userId: string,
  ): Promise<string> {
    try {
      this.logger.log(`프로필 이미지 업로드 시작 - 사용자: ${userId}`);

      // 파일 정보 로깅
      this.logger.log(
        `원본 파일: ${file.originalname}, 크기: ${file.size}, 타입: ${file.mimetype}`,
      );

      // Sharp를 사용한 이미지 최적화 및 WebP 변환
      const optimizedImage = await this.optimizeImage(file.buffer);

      // S3에 업로드
      const imageUrl = await this.uploadToS3(optimizedImage, userId);

      this.logger.log(`프로필 이미지 업로드 완료: ${imageUrl}`);

      return imageUrl;
    } catch (error) {
      this.logger.error(
        `프로필 이미지 업로드 실패: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  private async optimizeImage(buffer: Buffer): Promise<Buffer> {
    try {
      this.logger.log('이미지 최적화 시작');

      const optimized = await sharp(buffer)
        .resize({
          width: 800,
          height: 800,
          fit: 'cover',
          position: 'center',
        })
        .webp({
          quality: 80,
          effort: 4, // 압축 레벨 (0-6, 높을수록 더 작은 파일)
        })
        .toBuffer();

      this.logger.log(
        `이미지 최적화 완료 - 원본: ${buffer.length}bytes → 최적화: ${optimized.length}bytes`,
      );

      return optimized;
    } catch (error) {
      this.logger.error('이미지 최적화 실패, 원본 반환: ', error);
      return buffer;
    }
  }

  private async uploadToS3(buffer: Buffer, userId: string): Promise<string> {
    const fileName = `profile-images/${userId}/${uuidv4()}.webp`;

    const uploadParams: AWS.S3.PutObjectRequest = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: 'image/webp',
      CacheControl: 'max-age=31536000', // 1년 캐시
      Metadata: {
        userId,
        uploadedAt: new Date().toISOString(),
      },
    };

    try {
      const result = await this.s3.upload(uploadParams).promise();
      return result.Location;
    } catch (error) {
      this.logger.error(`S3 업로드 실패: ${error.message}`);
      throw new Error('S3 업로드 실패');
    }
  }

  // 기존 프로필 이미지 삭제 (선택사항)
  async deleteProfileImage(imageUrl: string): Promise<void> {
    try {
      const key = this.extractS3KeyFromUrl(imageUrl);
      if (key) {
        await this.s3
          .deleteObject({
            Bucket: this.bucketName,
            Key: key,
          })
          .promise();

        this.logger.log(`이미지 삭제 완료: ${key}`);
      }
    } catch (error) {
      this.logger.error(`이미지 삭제 실패: ${error.message}`);
    }
  }

  private extractS3KeyFromUrl(url: string): string | null {
    try {
      const urlParts = new URL(url);
      return urlParts.pathname.substring(1); // 첫 번째 '/' 제거
    } catch {
      return null;
    }
  }
}
