import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { GoogleAuthModule } from './google/google.auth.module';

import { NaverAuthModule } from './naver/naver.auth.module';
@Module({
  imports: [PassportModule, ConfigModule, GoogleAuthModule, NaverAuthModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AuthModule {}
