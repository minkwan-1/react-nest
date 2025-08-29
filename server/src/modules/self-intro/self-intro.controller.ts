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

    const content = await this.selfIntroService.find(userId);

    return { selfIntro: content };
  }
}
