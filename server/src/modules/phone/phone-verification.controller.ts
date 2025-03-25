import { Controller, Post, Body } from '@nestjs/common';
import { PhoneVerificationService } from './phone-verification.service';

interface SendCodeDto {
  toPhoneNumber: string;
}

interface VerifyCodeDto {
  phoneNumber: string;
  verificationCode: string;
}

@Controller('api')
export class PhoneVerificationController {
  constructor(
    private readonly phoneVerificationService: PhoneVerificationService,
  ) {}

  // 전화번호로 인증 코드 SMS 전송 API
  @Post('send-code')
  async sendSms(
    @Body() body: SendCodeDto,
  ): Promise<{ message: string; sid?: string }> {
    const { toPhoneNumber } = body;
    return this.phoneVerificationService.sendVerificationCode(toPhoneNumber);
  }

  // 인증 코드 확인 API
  @Post('verify-code')
  async verifyCode(@Body() body: VerifyCodeDto): Promise<{ message: string }> {
    const { phoneNumber, verificationCode } = body;
    return this.phoneVerificationService.verifyCode(
      phoneNumber,
      verificationCode,
    );
  }
}
