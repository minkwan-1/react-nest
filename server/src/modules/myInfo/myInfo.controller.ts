import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { MyInfoService } from './myInfo.service';
import { AuthenticatedGuard } from '../auth/guard/authenticated.guard';

@Controller('my-info')
export class MyInfoController {
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

    try {
      await this.myInfoService.upsert(
        userId,
        nickname,
        interests,
        socialLinks,
        profileImageUrl,
      );

      return { message: 'MyInfo successfully upserted.' };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  async getMyInfo(@Query('id') userId: string) {
    if (!userId) return { myInfo: '' };

    try {
      const myInfo = await this.myInfoService.find(userId);

      return myInfo;
    } catch (error) {
      throw error;
    }
  }

  @Get('public')
  async getPublicMyInfo(@Query('id') userId: string) {
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
