import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { KakaoAuthController } from './kakao/kakao.auth.controller';
import { KakaoAuthService } from './kakao/kakao.auth.service';
import { NaverAuthController } from './naver/naver.auth.controller';
import { GoogleAuthController } from './google/google.auth.controller';
import { AuthController } from './local/local.auth.controller';

@Module({
  imports: [HttpModule],
  controllers: [
    AuthController,
    KakaoAuthController,
    NaverAuthController,
    GoogleAuthController,
  ],
  providers: [KakaoAuthService],
})
export class AuthModule {}
