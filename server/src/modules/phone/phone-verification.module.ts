import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneVerification } from './phone-verification.entity';
import { PhoneVerificationRepository } from './phone-verification.repository';
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
