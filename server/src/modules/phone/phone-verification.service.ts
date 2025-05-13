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

  // 1. 인증 코드 생성
  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // 2. 인증 코드 전송
  async sendVerificationCode(
    toPhoneNumber: string,
  ): Promise<{ message: string; sid?: string }> {
    console.log('수신된 전화번호:', toPhoneNumber);

    if (!toPhoneNumber) {
      // 2-1. 전화번호가 없을 경우
      return { message: '전화번호가 필요합니다.' };
    }

    try {
      // 2-2. 인증 코드 생성 및 만료 시간 설정
      const verificationCode = this.generateVerificationCode();
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10);

      // 2-3. 저장소에 인증 정보 저장
      const savedVerification =
        await this.phoneVerificationRepository.savePhoneVerificationInfo(
          toPhoneNumber,
          verificationCode,
          expiresAt,
        );
      console.log('저장된 인증 정보:', savedVerification);

      // 2-4. Twilio로 인증 코드 전송
      const message = await this.client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: toPhoneNumber,
        body: `인증 코드: ${verificationCode}. 이 코드는 10분 후에 만료됩니다.`,
      });

      // 2-5. 성공 메시지 및 SID 반환
      return {
        message: '인증 코드가 성공적으로 전송되었습니다!',
        sid: message.sid,
      };
    } catch (error) {
      // 2-6. 오류 처리
      console.error('인증 코드 전송 오류:', error);
      return { message: '인증 코드 전송에 실패했습니다.' };
    }
  }

  // 3. 인증 코드 확인
  async verifyCode(
    phoneNumber: string,
    verificationCode: string,
  ): Promise<{ message: string }> {
    console.log('인증 코드 확인 중 - 전화번호:', phoneNumber);

    if (!phoneNumber || !verificationCode) {
      // 3-1. 전화번호 또는 인증 코드가 없는 경우
      return { message: '전화번호와 인증 코드가 필요합니다.' };
    }

    try {
      // 3-2. 저장소에서 인증 정보 검색
      const storedVerification =
        await this.phoneVerificationRepository.findByPhoneNumber(phoneNumber);

      console.log('DB에서 찾은 인증 정보:', storedVerification);

      if (!storedVerification) {
        // 3-3. 인증 정보가 없는 경우
        return {
          message: '인증 코드를 찾을 수 없습니다. 새 코드를 요청해 주세요.',
        };
      }

      if (new Date() > storedVerification.expiresAt) {
        // 3-4. 인증 코드 만료된 경우
        await this.phoneVerificationRepository.deleteByPhoneNumber(phoneNumber);
        return {
          message: '인증 코드가 만료되었습니다. 새 코드를 요청해 주세요.',
        };
      }

      if (verificationCode !== storedVerification.code) {
        // 3-5. 인증 코드가 일치하지 않는 경우
        return {
          message: '유효하지 않은 인증 코드입니다. 다시 시도해 주세요.',
        };
      }

      // 3-6. 인증 성공 시 사용자 등록 완료
      await this.phoneVerificationRepository.markAsVerified(phoneNumber);

      console.log('인증 완료된 사용자 정보:', {
        ...storedVerification,
        verified: true,
      });

      return { message: '전화번호 인증 및 사용자 등록이 완료되었습니다!' };
    } catch (error) {
      // 3-7. 오류 처리
      console.error('인증 코드 확인 오류:', error);
      return { message: '인증 처리 중 오류가 발생했습니다.' };
    }
  }
}
