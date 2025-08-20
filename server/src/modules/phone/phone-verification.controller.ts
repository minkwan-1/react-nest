import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PhoneVerificationService } from './phone-verification.service';
import { UsersService } from '../users/users.service';

interface SendCodeDto {
  toPhoneNumber: string;
  userInfo: {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
    provider: string;
  };
}

interface VerifyCodeDto {
  phoneNumber: string;
  verificationCode: string;
}

@Controller('api')
export class PhoneVerificationController {
  constructor(
    private readonly phoneVerificationService: PhoneVerificationService,
    private readonly usersService: UsersService,
  ) {}

  @Post('send-code')
  async sendSms(
    @Body() body: SendCodeDto,
  ): Promise<{ message: string; sid?: string }> {
    const { toPhoneNumber } = body;

    let formattedPhoneNumber = toPhoneNumber;
    if (formattedPhoneNumber.startsWith('+82')) {
      formattedPhoneNumber = formattedPhoneNumber.substring(3);
    }

    const existingUser =
      await this.usersService.findByPhoneNumber(formattedPhoneNumber);

    if (existingUser) {
      return {
        message:
          '이미 가입된 휴대폰 번호입니다. 다른 로그인 방법을 이용해주세요.',
      };
    }

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
