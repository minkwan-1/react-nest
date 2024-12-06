import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { LocalAuthController } from './local/local.auth.controller';
import { LocalAuthService } from './local/local.auth.service';

import { KakaoAuthController } from './kakao/kakao.auth.controller';
import { KakaoAuthService } from './kakao/kakao.auth.service';

import { NaverAuthController } from './naver/naver.auth.controller';
import { NaverAuthService } from './naver/naver.auth.service';

import { GoogleAuthModule } from './google/google.auth.module';

@Module({
  imports: [HttpModule, GoogleAuthModule],
  controllers: [LocalAuthController, KakaoAuthController, NaverAuthController],
  providers: [LocalAuthService, KakaoAuthService, NaverAuthService],
})
export class AuthModule {}
