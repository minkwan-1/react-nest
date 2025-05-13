import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// 1. 엔티티 및 레포지토리
import { PhoneVerification } from './phone-verification.entity';
import { PhoneVerificationRepository } from './phone-verification.repository';

// 2. 서비스 및 컨트롤러
import { PhoneVerificationService } from './phone-verification.service';
import { PhoneVerificationController } from './phone-verification.controller';

@Module({
  // TypeORM에 엔티티 등록
  imports: [TypeOrmModule.forFeature([PhoneVerification])],

  // 요청을 처리하는 컨트롤러
  controllers: [PhoneVerificationController],

  // 비즈니스 로직 및 데이터 접근 계층
  providers: [PhoneVerificationService, PhoneVerificationRepository],

  // 외부 모듈에서 서비스 사용 가능하게 export
  exports: [PhoneVerificationService],
})
export class PhoneVerificationModule {}
