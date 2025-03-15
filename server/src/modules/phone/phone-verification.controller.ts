import { Controller, Post, Body } from '@nestjs/common';
import * as twilio from 'twilio';

@Controller('api')
export class PhoneVerificationController {
  private client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
  );

  // 전화번호로 SMS 전송
  @Post('send-code')
  async sendSms(@Body() body: { toPhoneNumber: string }): Promise<any> {
    const { toPhoneNumber } = body;

    // 확인용 로그 추가
    console.log('Phone number received:', toPhoneNumber);

    // toPhoneNumber가 비어있는지 확인
    if (!toPhoneNumber) {
      return { message: 'Phone number is required.' };
    }

    try {
      const message = await this.client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: toPhoneNumber, // 수신번호
        body: 'Hello, this is a test message from Twilio!',
      });

      console.log('SMS sent successfully:', message.sid);
      return { message: 'SMS sent successfully!', sid: message.sid };
    } catch (error) {
      console.error('Error sending SMS:', error);
      return { message: 'Failed to send SMS.' };
    }
  }
}
