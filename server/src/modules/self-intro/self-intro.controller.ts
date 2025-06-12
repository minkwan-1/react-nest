import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { SelfIntroService } from './self-intro.service';

@Controller('self-intro')
export class SelfIntroController {
  constructor(private readonly selfIntroService: SelfIntroService) {}

  @Put()
  async updateSelfIntro(
    @Body('id') userId: string,
    @Body('selfIntro') selfIntro: string,
  ) {
    await this.selfIntroService.upsert(userId, selfIntro);
    return { message: 'Self introduction saved.' };
  }

  @Get()
  async getSelfIntro(@Query('id') userId: string) {
    if (!userId) {
      return { selfIntro: '' };
    }
    console.log('유저 아이디:', userId);
    const content = await this.selfIntroService.find(userId);
    console.log('조회된 소개:', content);
    return { selfIntro: content };
  }
}
