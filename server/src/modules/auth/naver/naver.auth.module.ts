import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NaverUser } from './naver.auth.entity';
import { NaverAuthService } from './naver.auth.service';
import { NaverAuthRepository } from './naver.auth.repository';
import { NaverAuthController } from './naver.auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NaverUser])],
  controllers: [NaverAuthController],
  providers: [NaverAuthService, NaverAuthRepository],
  exports: [NaverAuthService, NaverAuthRepository],
})
export class NaverAuthModule {}
