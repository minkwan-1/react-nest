import { Controller, Post, Body } from '@nestjs/common';
import * as twilio from 'twilio';

interface SendCodeDto {
  toPhoneNumber: string;
}

interface VerifyCodeDto {
  phoneNumber: string;
  verificationCode: string;
}

@Controller('api')
export class PhoneVerificationController {
  private client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
  );

  // 인증 코드 저장용 메모리 저장소 (실제 서비스에서는 데이터베이스 사용 권장)
  private verificationCodes: Map<string, { code: string; expiresAt: Date }> =
    new Map();

  // 6자리 랜덤 인증 코드 생성 함수
  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // 전화번호로 인증 코드 SMS 전송 API
  @Post('send-code')
  async sendSms(@Body() body: SendCodeDto): Promise<any> {
    const { toPhoneNumber } = body;

    console.log('수신된 전화번호:', toPhoneNumber);

    // 전화번호 유효성 검사
    if (!toPhoneNumber) {
      return { message: '전화번호가 필요합니다.' };
    }

    try {
      // 6자리 랜덤 코드 생성
      const verificationCode = this.generateVerificationCode();

      // 코드와 만료시간(10분) 저장
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10);
      this.verificationCodes.set(toPhoneNumber, {
        code: verificationCode,
        expiresAt,
      });

      // Twilio를 통해 SMS 전송
      const message = await this.client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: toPhoneNumber,
        body: `인증 코드: ${verificationCode}. 이 코드는 10분 후에 만료됩니다.`,
      });

      console.log('SMS 전송 성공:');
      return {
        message: '인증 코드가 성공적으로 전송되었습니다!',
        sid: message.sid,
      };
    } catch (error) {
      console.error('SMS 전송 오류:', error);
      return { message: '인증 코드 전송에 실패했습니다.' };
    }
  }

  // 인증 코드 확인 API
  @Post('verify-code')
  async verifyCode(@Body() body: VerifyCodeDto): Promise<any> {
    const { phoneNumber, verificationCode } = body;

    console.log('인증 코드 확인 중 - 전화번호:', phoneNumber);

    // 전화번호와 인증 코드 존재 여부 확인
    if (!phoneNumber || !verificationCode) {
      return { message: '전화번호와 인증 코드가 필요합니다.' };
    }

    // 저장된 인증 정보 가져오기
    const storedVerification = this.verificationCodes.get(phoneNumber);

    // 인증 코드 존재 여부 확인
    if (!storedVerification) {
      return {
        message: '인증 코드를 찾을 수 없습니다. 새 코드를 요청해 주세요.',
      };
    }

    // 인증 코드 만료 여부 확인
    if (new Date() > storedVerification.expiresAt) {
      // 만료된 코드 삭제
      this.verificationCodes.delete(phoneNumber);
      return {
        message: '인증 코드가 만료되었습니다. 새 코드를 요청해 주세요.',
      };
    }

    // 인증 코드 일치 여부 확인
    if (verificationCode !== storedVerification.code) {
      return { message: '유효하지 않은 인증 코드입니다. 다시 시도해 주세요.' };
    }

    // 인증 성공 - 사용된 코드 삭제
    this.verificationCodes.delete(phoneNumber);

    // 실제 애플리케이션에서는 여기서 사용자 레코드나 세션 데이터를 업데이트할 수 있음
    return { message: '전화번호 인증 및 사용자 등록이 완료되었습니다!' };
  }
}
