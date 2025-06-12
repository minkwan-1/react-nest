// src/self-intro/self-intro.controller.ts
import { Controller, Put, Req, Body } from '@nestjs/common';
import { SelfIntroService } from './self-intro.service';

@Controller('self-intro')
export class SelfIntroController {
  constructor(private readonly selfIntroService: SelfIntroService) {}

  @Put()
  async updateSelfIntro(@Req() req, @Body('selfIntro') selfIntro: string) {
    const userId = req.user.id;
    await this.selfIntroService.upsert(userId, selfIntro);
    return { message: 'Self introduction saved.' };
  }
}
