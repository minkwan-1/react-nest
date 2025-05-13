import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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

  // 1. 인증 코드 전송 요청
  @Post('send-code')
  async sendSms(
    @Body() body: SendCodeDto,
  ): Promise<{ message: string; sid?: string }> {
    const { toPhoneNumber } = body;

    try {
      // 1-1. 인증 코드 전송 서비스 호출
      return await this.phoneVerificationService.sendVerificationCode(
        toPhoneNumber,
      );
    } catch {
      // 1-2. 실패 시 에러 처리
      throw new HttpException(
        'Failed to send verification code. Please try again later.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // 2. 인증 코드 검증 요청
  @Post('verify-code')
  async verifyCode(@Body() body: VerifyCodeDto): Promise<{ message: string }> {
    const { phoneNumber, verificationCode } = body;

    try {
      // 2-1. 인증 코드 검증 서비스 호출
      return await this.phoneVerificationService.verifyCode(
        phoneNumber,
        verificationCode,
      );
    } catch {
      // 2-2. 실패 시 에러 처리
      throw new HttpException(
        'Verification failed. Please check the code and try again.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
