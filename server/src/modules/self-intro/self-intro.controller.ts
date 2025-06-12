import { Controller, Put, Body } from '@nestjs/common';
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
}
