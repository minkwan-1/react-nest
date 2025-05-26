import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

// 엔티티 및 리포지토리
import { NaverUser } from './naver.auth.entity';
import { NaverAuthRepository } from './naver.auth.repository';

// 서비스 및 컨트롤러
import { NaverAuthService } from './naver.auth.service';
import { NaverAuthController } from './naver.auth.controller';

// 의존 모듈
import { AuthModule } from '../auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NaverUser]),

    PassportModule.register({ session: true }),

    forwardRef(() => AuthModule),

    UsersModule,
    SessionModule,
  ],
  controllers: [NaverAuthController],
  providers: [NaverAuthService, NaverAuthRepository],
  exports: [NaverAuthService],
})
export class NaverAuthModule {}
