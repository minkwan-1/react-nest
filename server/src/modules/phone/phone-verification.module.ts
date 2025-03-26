import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneVerificationController } from './phone-verification.controller';
import { PhoneVerificationService } from './phone-verification.service';
import { PhoneVerification } from './phone-verification.entity';
import { PhoneVerificationRepository } from './phone-verification.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneVerification])],
  controllers: [PhoneVerificationController],
  providers: [PhoneVerificationService, PhoneVerificationRepository],
  exports: [PhoneVerificationService],
})
export class PhoneVerificationModule {}
