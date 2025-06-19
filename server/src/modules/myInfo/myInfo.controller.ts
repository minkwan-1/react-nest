import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import { MyInfoService } from './myInfo.service';

@ApiTags('my-info')
@Controller('my-info')
export class MyInfoController {
  constructor(private readonly myInfoService: MyInfoService) {}

  // my info 등록 처리 (프로필 이미지 URL 포함)
  @Post()
  async upsertMyInfo(
    @Body()
    body: {
      userId: string;
      job: string;
      interests: string[];
      socialLinks: string[];
      profileImageUrl?: string;
    },
  ) {
    const { userId, job, interests, socialLinks, profileImageUrl } = body;

    await this.myInfoService.upsert(
      userId,
      job,
      interests,
      socialLinks,
      profileImageUrl,
    );

    return { message: 'MyInfo successfully upserted.' };
  }

  // my info 찾기
  @Get()
  async getMyInfo(@Query('id') userId: string) {
    if (!userId) {
      return { myInfo: '' };
    }
    const myInfo = await this.myInfoService.find(userId);

    return { myInfo };
  }

  // 프로필 이미지 업로드
  @Post('upload-image')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('profileImage'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Profile image upload',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        profileImage: {
          type: 'string',
          format: 'binary',
        },
        userId: {
          type: 'string',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Image uploaded successfully',
    schema: {
      type: 'object',
      properties: {
        imageUrl: { type: 'string' },
        message: { type: 'string' },
      },
    },
  })
  async uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId') userId: string,
  ) {
    if (!file) {
      throw new BadRequestException('프로필 이미지가 필요합니다.');
    }

    if (!userId) {
      throw new BadRequestException('사용자 ID가 필요합니다.');
    }

    // 파일 타입 검증
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('이미지 파일만 업로드 가능합니다.');
    }

    // 파일 크기 검증 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestException('파일 크기는 5MB 이하여야 합니다.');
    }

    try {
      const imageUrl = await this.myInfoService.uploadProfileImage(
        file,
        userId,
      );

      return {
        imageUrl,
        message: '프로필 이미지가 성공적으로 업로드되었습니다.',
      };
    } catch (error) {
      throw new BadRequestException(`이미지 업로드 실패: ${error.message}`);
    }
  }
}
