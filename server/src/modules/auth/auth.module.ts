import { Module } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';
import { LocalAuthModule } from './local/local.auth.module';
import { KakaoAuthModule } from './kakao/kakao.auth.module';
import { NaverAuthModule } from './naver/naver.auth.module';
import { GoogleAuthModule } from './google/google.auth.module';

@Module({
  imports: [
    HttpModule,
    LocalAuthModule,
    KakaoAuthModule,
    NaverAuthModule,
    GoogleAuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AuthModule {}
