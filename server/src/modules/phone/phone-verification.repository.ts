import { EntityRepository, Repository } from 'typeorm';
import { PhoneVerification } from './phone-verification.entity';

@EntityRepository(PhoneVerification)
export class PhoneVerificationRepository extends Repository<PhoneVerification> {
  // 전화번호로 인증 코드 찾기
  async findByPhoneNumber(
    phoneNumber: string,
  ): Promise<PhoneVerification | undefined> {
    return this.findOne({ where: { phoneNumber } });
  }

  // 새로운 인증 코드 저장
  async createVerificationCode(
    phoneNumber: string,
    code: string,
    expiresAt: Date,
  ): Promise<PhoneVerification> {
    const verification = this.create({
      phoneNumber,
      code,
      expiresAt,
    });
    return this.save(verification);
  }

  // 인증 코드 삭제
  async deleteByPhoneNumber(phoneNumber: string): Promise<void> {
    await this.delete({ phoneNumber });
  }
}
