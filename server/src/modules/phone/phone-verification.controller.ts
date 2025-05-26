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

  // [POST] 인증 코드 전송 요청
  @Post('send-code')
  async sendSms(
    @Body() body: SendCodeDto,
  ): Promise<{ message: string; sid?: string }> {
    const { toPhoneNumber } = body;

    try {
      return await this.phoneVerificationService.sendVerificationCode(
        toPhoneNumber,
      );
    } catch {
      throw new HttpException(
        'Failed to send verification code. Please try again later.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // [POST] 인증 코드 검증 요청
  @Post('verify-code')
  async verifyCode(@Body() body: VerifyCodeDto): Promise<{ message: string }> {
    const { phoneNumber, verificationCode } = body;

    try {
      return await this.phoneVerificationService.verifyCode(
        phoneNumber,
        verificationCode,
      );
    } catch {
      throw new HttpException(
        'Verification failed. Please check the code and try again.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
