import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AuthController } from './local/local.auth.controller';

import { KakaoAuthController } from './kakao/kakao.auth.controller';
import { KakaoAuthService } from './kakao/kakao.auth.service';

import { NaverAuthController } from './naver/naver.auth.controller';
import { NaverAuthService } from './naver/naver.auth.service';

import { GoogleAuthController } from './google/google.auth.controller';
import { GoogleAuthService } from './google/google.auth.service';

@Module({
  imports: [HttpModule],
  controllers: [
    AuthController,
    KakaoAuthController,
    NaverAuthController,
    GoogleAuthController,
  ],
  providers: [KakaoAuthService, NaverAuthService, GoogleAuthService],
})
export class AuthModule {}
