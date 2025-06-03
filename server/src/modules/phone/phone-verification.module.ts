import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// 엔티티 및 레포지토리
import { PhoneVerification } from './phone-verification.entity';
import { PhoneVerificationRepository } from './phone-verification.repository';

// 서비스 및 컨트롤러
import { PhoneVerificationService } from './phone-verification.service';
import { PhoneVerificationController } from './phone-verification.controller';

import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneVerification]), UsersModule],

  controllers: [PhoneVerificationController],

  providers: [PhoneVerificationService, PhoneVerificationRepository],

  exports: [PhoneVerificationService],
})
export class PhoneVerificationModule {}
