import { Body, Controller, Get, Post, Query, Logger } from '@nestjs/common';
import { MyInfoService } from './myInfo.service';

@Controller('my-info')
export class MyInfoController {
  private readonly logger = new Logger(MyInfoController.name); // 클래스 이름 기반 로거

  constructor(private readonly myInfoService: MyInfoService) {}

  // my info 등록 처리
  @Post()
  async upsertMyInfo(
    @Body()
    body: {
      userId: string;
      job: string;
      interests: string[];
      profileImageUrl?: string;
      socialLinks: string[];
    },
  ) {
    const { userId, job, interests, socialLinks, profileImageUrl } = body;

    this.logger.log(
      `업데이트 요청 - userId: ${userId}, job: ${job}, interests: ${JSON.stringify(
        interests,
      )}, profileImageUrl: ${profileImageUrl}, socialLinks: ${JSON.stringify(
        socialLinks,
      )}`,
    );

    try {
      await this.myInfoService.upsert(
        userId,
        job,
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

  // my info 찾기
  @Get()
  async getMyInfo(@Query('id') userId: string) {
    this.logger.log(`MyInfo 조회 요청 - userId: ${userId}`);

    if (!userId) {
      this.logger.warn(`userId가 전달되지 않음`);
      return { myInfo: '' };
    }

    try {
      const myInfo = await this.myInfoService.find(userId);
      this.logger.log(`MyInfo 조회 성공 - userId: ${userId}`);
      return { myInfo };
    } catch (error) {
      this.logger.error(
        `MyInfo 조회 실패 - userId: ${userId}, 에러: ${error.message}`,
      );
      throw error;
    }
  }
}
