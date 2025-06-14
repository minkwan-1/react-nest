import { Body, Controller, Post } from '@nestjs/common';
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
}
