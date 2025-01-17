import { Module } from '@nestjs/common';
import { PhoneVerificationService } from './phone-verification.service';
import { PhoneVerificationController } from './phone-verification.controller';

@Module({
  providers: [PhoneVerificationService],
  controllers: [PhoneVerificationController],
})
export class PhoneVerificationModule {}
