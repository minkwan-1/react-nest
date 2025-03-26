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

      // 인증 코드 생성 (verified = false 상태로)
      const phoneVerification = this.phoneVerificationRepository.create({
        phoneNumber: toPhoneNumber,
        code: verificationCode,
        expiresAt,
        verified: false,
      });
      console.log('DB에 전달할 인증 정보:', phoneVerification);

      // 데이터베이스에 저장
      const savedVerification =
        await this.phoneVerificationRepository.save(phoneVerification);
      console.log('저장된 인증 정보:', savedVerification);

      // Twilio로 SMS 전송
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
      console.error('SMS 전송 또는 DB 저장 오류:', error);
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

    try {
      const storedVerification = await this.phoneVerificationRepository.findOne(
        {
          where: { phoneNumber },
        },
      );

      console.log('DB에서 찾은 인증 정보:', storedVerification);

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
        return {
          message: '유효하지 않은 인증 코드입니다. 다시 시도해 주세요.',
        };
      }

      // 인증 성공 시 verified 상태를 true로 업데이트
      storedVerification.verified = true;
      await this.phoneVerificationRepository.save(storedVerification);

      console.log('인증 완료된 사용자 정보:', storedVerification);

      return { message: '전화번호 인증 및 사용자 등록이 완료되었습니다!' };
    } catch (error) {
      console.error('인증 코드 확인 오류:', error);
      return { message: '인증 처리 중 오류가 발생했습니다.' };
    }
  }
}
