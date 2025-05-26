import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

// 엔터티 및 리포지토리
import { UserSession } from './session.entity';
import { SessionRepository } from './session.repository';

// 서비스 및 컨트롤러
import { SessionService } from './session.service';
import { SessionController } from './session.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSession]),
    PassportModule.register({ session: true }),
  ],
  controllers: [SessionController],
  providers: [SessionService, SessionRepository],
  exports: [SessionService],
})
export class SessionModule {}
