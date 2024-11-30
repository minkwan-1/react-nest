import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google/google.auth.service';
import { NaverAuthService } from './naver/naver.auth.service';
import { KakaoAuthService } from './kakao/kakao.auth.service';
import { GoogleStrategy } from './google/google.strategy';
import { NaverStrategy } from './naver/naver.strategy';
import { KakaoStrategy } from './kakao/kakao.strategy';

@Module({
  providers: [
    GoogleAuthService,
    NaverAuthService,
    KakaoAuthService,
    GoogleStrategy,
    NaverStrategy,
    KakaoStrategy,
  ],
})
export class AuthModule {}
