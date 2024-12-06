import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { LocalAuthController } from './local/local.auth.controller';
import { LocalAuthService } from './local/local.auth.service';

import { KakaoAuthModule } from './kakao/kakao.auth.module';

import { NaverAuthController } from './naver/naver.auth.controller';
import { NaverAuthService } from './naver/naver.auth.service';

import { GoogleAuthModule } from './google/google.auth.module';

@Module({
  imports: [HttpModule, GoogleAuthModule, KakaoAuthModule],
  controllers: [LocalAuthController, NaverAuthController],
  providers: [LocalAuthService, NaverAuthService],
})
export class AuthModule {}
