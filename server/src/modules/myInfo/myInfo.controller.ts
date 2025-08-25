// myInfo.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { MyInfoService } from './myInfo.service';
import { AuthenticatedGuard } from '../auth/guard/authenticated.guard';

@Controller('my-info')
export class MyInfoController {
  private readonly logger = new Logger(MyInfoController.name);

  constructor(private readonly myInfoService: MyInfoService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  async upsertMyInfo(
    @Body()
    body: {
      userId: string;
      nickname: string;
      interests: string[];
      profileImageUrl?: string;
      socialLinks: string[];
    },
  ) {
    const { userId, nickname, interests, socialLinks, profileImageUrl } = body;
    this.logger.log(
      `업데이트 요청 - userId: ${userId}, nickname: ${nickname}, interests: ${JSON.stringify(
        interests,
      )}, profileImageUrl: ${profileImageUrl}, socialLinks: ${JSON.stringify(
        socialLinks,
      )}`,
    );

    try {
      await this.myInfoService.upsert(
        userId,
        nickname,
        interests,
        socialLinks,
        profileImageUrl,
      );
      this.logger.log(`MyInfo upsert 성공 for userId: ${userId}`);
      return { message: 'MyInfo successfully upserted.' };
    } catch (error) {
      this.logger.error(
        `MyInfo upsert 실패 for userId: ${userId}, 에러: ${error.message}`,
      );
      throw error;
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  async getMyInfo(@Query('id') userId: string) {
    this.logger.log(`MyInfo 조회 요청 - userId: ${userId}`);
    if (!userId) return { myInfo: '' };

    try {
      const myInfo = await this.myInfoService.find(userId);
      this.logger.log(`MyInfo 조회 성공 - userId: ${userId}`);
      return myInfo;
    } catch (error) {
      this.logger.error(
        `MyInfo 조회 실패 - userId: ${userId}, 에러: ${error.message}`,
      );
      throw error;
    }
  }

  @Get('public')
  async getPublicMyInfo(@Query('id') userId: string) {
    console.log(userId);
    if (!userId) return null;
    try {
      const publicMyInfo = await this.myInfoService.findPublicInfo(userId);
      return publicMyInfo;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
