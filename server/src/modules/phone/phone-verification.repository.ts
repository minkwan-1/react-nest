import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhoneVerification } from './phone-verification.entity';

@Injectable()
export class PhoneVerificationRepository {
  constructor(
    @InjectRepository(PhoneVerification)
    private readonly repo: Repository<PhoneVerification>,
  ) {}

  // 1. 전화번호 인증 정보 저장
  async savePhoneVerificationInfo(
    phoneNumber: string,
    code: string,
    expiresAt: Date,
  ): Promise<PhoneVerification> {
    const verification = this.repo.create({
      phoneNumber,
      code,
      expiresAt,
      verified: false,
    });
    return await this.repo.save(verification);
  }

  // 2. 전화번호로 인증 정보 찾기
  async findByPhoneNumber(
    phoneNumber: string,
  ): Promise<PhoneVerification | null> {
    return await this.repo.findOne({
      where: { phoneNumber },
    });
  }

  // 3. 전화번호로 인증 정보 삭제
  async deleteByPhoneNumber(phoneNumber: string): Promise<void> {
    await this.repo.delete({ phoneNumber });
  }

  // 4. 인증 완료 처리
  async markAsVerified(phoneNumber: string): Promise<void> {
    const verification = await this.findByPhoneNumber(phoneNumber);
    if (verification) {
      verification.verified = true;
      await this.repo.save(verification);
    }
  }
}
