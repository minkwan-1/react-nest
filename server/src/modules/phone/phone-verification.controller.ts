// import { Controller, Post, Body } from '@nestjs/common';
// import { PhoneVerificationService } from './phone-verification.service';

// @Controller('api')
// export class PhoneVerificationController {
//   constructor(
//     private readonly phoneVerificationService: PhoneVerificationService,
//   ) {}

//   @Post('send-code')
//   async sendCode(@Body() body: { phoneNumber: string }) {
//     console.log('Received request to send verification code:', body); // 로그 추가
//     try {
//       const message = await this.phoneVerificationService.sendVerificationCode(
//         body.phoneNumber,
//       );
//       console.log('Verification code sent:', message); // 로그 추가
//       return { message };
//     } catch (error) {
//       console.error('Error sending verification code:', error); // 에러 로그 추가
//       return { message: error.message };
//     }
//   }

//   @Post('verify-code')
//   async verifyCode(
//     @Body() body: { phoneNumber: string; verificationCode: string },
//   ) {
//     console.log('Received request to verify code:', body); // 로그 추가
//     try {
//       const message = await this.phoneVerificationService.verifyCode(
//         body.phoneNumber,
//         body.verificationCode,
//       );
//       console.log('Verification code verified:', message); // 로그 추가
//       return { message };
//     } catch (error) {
//       console.error('Error verifying code:', error); // 에러 로그 추가
//       return { message: error.message };
//     }
//   }
// }
