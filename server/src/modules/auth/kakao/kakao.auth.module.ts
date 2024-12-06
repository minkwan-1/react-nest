import { Module } from '@nestjs/common';
import { KakaoAuthController } from './kakao.auth.controller';
import { KakaoAuthService } from './kakao.auth.service';

@Module({
  controllers: [KakaoAuthController],
  providers: [KakaoAuthService],
})
export class KakaoAuthModule {}
