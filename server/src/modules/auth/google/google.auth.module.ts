import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

// 1. 엔티티 및 리포지토리
import { GoogleUser } from './google.auth.entity';
import { GoogleAuthRepository } from './google.auth.repository';

// 2. 서비스 및 컨트롤러
import { GoogleAuthService } from './google.auth.service';
import { GoogleAuthController } from './google.auth.controller';

// 3. 의존 모듈
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from '../auth.module';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [
    // GoogleUser 엔티티를 TypeORM에 등록
    TypeOrmModule.forFeature([GoogleUser]),

    // 세션 기반 Passport 인증 사용
    PassportModule.register({ session: true }),

    // 순환 참조 해결을 위한 forwardRef
    forwardRef(() => AuthModule),

    // 유저 정보 접근용 모듈
    UsersModule,
    SessionModule,
  ],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService, GoogleAuthRepository],
  exports: [GoogleAuthService],
})
export class GoogleAuthModule {}
