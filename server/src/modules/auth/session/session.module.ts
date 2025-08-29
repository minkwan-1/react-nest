import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UserSession } from './session.entity';
import { SessionRepository } from './session.repository';
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
