export class SendCodeDto {
  toPhoneNumber: string;
}

export class VerifyCodeDto {
  phoneNumber: string;
  verificationCode: string;
}
