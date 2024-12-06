import { Module } from '@nestjs/common';
import { NaverAuthController } from './naver.auth.controller';
import { NaverAuthService } from './naver.auth.service';

@Module({
  controllers: [NaverAuthController],
  providers: [NaverAuthService],
})
export class NaverAuthModule {}
