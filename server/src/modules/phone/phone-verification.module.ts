import { Module } from '@nestjs/common';
import { PhoneVerificationController } from './phone-verification.controller';
import { PhoneVerificationService } from './phone-verification.service';

@Module({
  controllers: [PhoneVerificationController],
  providers: [PhoneVerificationService],
  exports: [PhoneVerificationService],
})
export class PhoneVerificationModule {}
