import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhoneVerification } from './phone-verification.entity';
import * as twilio from 'twilio';

@Injectable()
export class PhoneVerificationService {
  private client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
  );

  constructor(
    @InjectRepository(PhoneVerification)
    private readonly phoneVerificationRepository: Repository<PhoneVerification>,
  ) {}

  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendVerificationCode(
    toPhoneNumber: string,
  ): Promise<{ message: string; sid?: string }> {
    console.log('수신된 전화번호:', toPhoneNumber);

    if (!toPhoneNumber) {
      return { message: '전화번호가 필요합니다.' };
    }

    try {
      const verificationCode = this.generateVerificationCode();
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10);

      const phoneVerification = this.phoneVerificationRepository.create({
        phoneNumber: toPhoneNumber,
        code: verificationCode,
        expiresAt,
      });
      console.log('DB에 전달할 twilio 값:', phoneVerification);

      await this.phoneVerificationRepository.save(phoneVerification);

      const message = await this.client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: toPhoneNumber,
        body: `인증 코드: ${verificationCode}. 이 코드는 10분 후에 만료됩니다.`,
      });

      return {
        message: '인증 코드가 성공적으로 전송되었습니다!',
        sid: message.sid,
      };
    } catch (error) {
      console.error('SMS 전송 오류:', error);
      return { message: '인증 코드 전송에 실패했습니다.' };
    }
  }

  async verifyCode(
    phoneNumber: string,
    verificationCode: string,
  ): Promise<{ message: string }> {
    console.log('인증 코드 확인 중 - 전화번호:', phoneNumber);

    if (!phoneNumber || !verificationCode) {
      return { message: '전화번호와 인증 코드가 필요합니다.' };
    }

    const storedVerification = await this.phoneVerificationRepository.findOne({
      where: { phoneNumber },
    });

    if (!storedVerification) {
      return {
        message: '인증 코드를 찾을 수 없습니다. 새 코드를 요청해 주세요.',
      };
    }

    if (new Date() > storedVerification.expiresAt) {
      await this.phoneVerificationRepository.delete({ phoneNumber });
      return {
        message: '인증 코드가 만료되었습니다. 새 코드를 요청해 주세요.',
      };
    }

    if (verificationCode !== storedVerification.code) {
      return { message: '유효하지 않은 인증 코드입니다. 다시 시도해 주세요.' };
    }

    await this.phoneVerificationRepository.delete({ phoneNumber });

    return { message: '전화번호 인증 및 사용자 등록이 완료되었습니다!' };
  }
}
