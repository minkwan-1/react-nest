import { Module } from '@nestjs/common';

import { PhoneVerificationController } from './phone-verification.controller';

@Module({
  providers: [],
  controllers: [PhoneVerificationController],
})
export class PhoneVerificationModule {}
