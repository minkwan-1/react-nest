import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';

@Injectable()
export class PhoneVerificationService {
  private readonly twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
  );
  private readonly twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

  async sendVerificationCode(phoneNumber: string): Promise<string> {
    console.log(`Sending verification code to ${phoneNumber}...`);
    try {
      const message = await this.twilioClient.messages.create({
        from: this.twilioPhoneNumber,
        to: phoneNumber,
        body: 'Your verification code is: 123456',
      });
      console.log('Message sent successfully:', message);
      return 'Verification code sent!';
    } catch (error) {
      console.error('Error in sending verification code:', error);
      throw new Error('Failed to send verification code');
    }
  }

  async verifyCode(
    phoneNumber: string,
    verificationCode: string,
  ): Promise<string> {
    console.log(
      `Verifying code for ${phoneNumber} with code: ${verificationCode}`,
    );
    if (verificationCode === '123456') {
      console.log('Verification code is correct');
      return 'Phone number verified!';
    } else {
      console.error('Verification failed');
      throw new Error('Invalid verification code');
    }
  }
}
