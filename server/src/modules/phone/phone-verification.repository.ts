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

  async findByPhoneNumber(
    phoneNumber: string,
  ): Promise<PhoneVerification | null> {
    return await this.repo.findOne({
      where: { phoneNumber },
      order: { expiresAt: 'DESC' },
    });
  }

  async deleteByPhoneNumber(phoneNumber: string): Promise<void> {
    await this.repo.delete({ phoneNumber });
  }

  async markAsVerified(phoneNumber: string): Promise<void> {
    const verification = await this.findByPhoneNumber(phoneNumber);
    if (verification) {
      verification.verified = true;
      await this.repo.save(verification);
    }
  }
}
