import { Injectable } from '@nestjs/common';
import { PhoneVerificationRepository } from './phone-verification.repository';
import * as twilio from 'twilio';

@Injectable()
export class PhoneVerificationService {
  private client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
  );

  constructor(
    private readonly phoneVerificationRepository: PhoneVerificationRepository,
  ) {}

  private generateVerificationCode(): string {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return code;
  }

  async sendVerificationCode(
    toPhoneNumber: string,
  ): Promise<{ message: string; sid?: string }> {
    if (!toPhoneNumber) {
      return { message: '전화번호가 필요합니다.' };
    }

    try {
      const verificationCode = this.generateVerificationCode();
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10);

      const savedVerification =
        await this.phoneVerificationRepository.savePhoneVerificationInfo(
          toPhoneNumber,
          verificationCode,
          expiresAt,
        );
      console.log(
        '[sendVerificationCode] DB에 저장된 인증 정보:',
        savedVerification,
      );

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
      console.error('[sendVerificationCode] 전송 실패:', error);
      return { message: '인증 코드 전송에 실패했습니다.' };
    }
  }

  async verifyCode(
    phoneNumber: string,
    verificationCode: string,
  ): Promise<{ message: string; status?: 'error' | 'success' }> {
    if (!phoneNumber || !verificationCode) {
      return { message: '전화번호와 인증 코드가 필요합니다.' };
    }

    try {
      const storedVerification =
        await this.phoneVerificationRepository.findByPhoneNumber(phoneNumber);

      if (!storedVerification) {
        return {
          message: '인증 코드를 찾을 수 없습니다. 새 코드를 요청해 주세요.',
          status: 'error',
        };
      }

      if (new Date() > storedVerification.expiresAt) {
        await this.phoneVerificationRepository.deleteByPhoneNumber(phoneNumber);
        return {
          message: '인증 코드가 만료되었습니다. 새 코드를 요청해 주세요.',
          status: 'error',
        };
      }

      if (verificationCode !== storedVerification.code) {
        return {
          message: '유효하지 않은 인증 코드입니다. 다시 시도해 주세요.',
          status: 'error',
        };
      }

      await this.phoneVerificationRepository.markAsVerified(phoneNumber);

      return {
        message: '전화번호 인증 및 사용자 등록이 완료되었습니다!',
        status: 'success',
      };
    } catch (error) {
      console.error('[verifyCode] 처리 중 예외 발생:', error);
      return { message: '인증 처리 중 오류가 발생했습니다.' };
    }
  }
}
