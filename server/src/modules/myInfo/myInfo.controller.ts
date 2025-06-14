import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MyInfoService } from './myInfo.service';

@Controller('my-info')
export class MyInfoController {
  constructor(private readonly myInfoService: MyInfoService) {}

  // my info 등록 처리
  @Post()
  async upsertMyInfo(
    @Body()
    body: {
      userId: string;
      job: string;
      interests: string[];
      socialLinks: string[];
    },
  ) {
    const { userId, job, interests, socialLinks } = body;

    await this.myInfoService.upsert(userId, job, interests, socialLinks);

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
}
