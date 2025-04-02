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

  // sendVerificationCode
  @Post('send-code')
  async sendSms(
    @Body() body: SendCodeDto,
  ): Promise<{ message: string; sid?: string }> {
    const { toPhoneNumber } = body;

    try {
      return await this.phoneVerificationService.sendVerificationCode(
        toPhoneNumber,
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to send verification code. Please try again later.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // verifyCode
  @Post('verify-code')
  async verifyCode(@Body() body: VerifyCodeDto): Promise<{ message: string }> {
    const { phoneNumber, verificationCode } = body;

    try {
      return await this.phoneVerificationService.verifyCode(
        phoneNumber,
        verificationCode,
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Verification failed. Please check the code and try again.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
