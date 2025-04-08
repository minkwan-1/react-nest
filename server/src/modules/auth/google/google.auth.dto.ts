// google.auth.dto.ts

import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class GoogleAuthCodeDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class TokenResponseDto {
  @IsString()
  accessToken: string;

  @IsString()
  @IsOptional()
  refreshToken?: string;

  @IsString()
  tokenType: string;

  expiresIn: number;
}
