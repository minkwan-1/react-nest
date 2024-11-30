import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { GoogleAuthService } from './google/google.auth.service';
import { NaverAuthService } from './naver/naver.auth.service';
import { KakaoAuthService } from './kakao/kakao.auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private googleAuthService: GoogleAuthService,
    private naverAuthService: NaverAuthService,
    private kakaoAuthService: KakaoAuthService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res) {
    const user = await this.googleAuthService.loginWithGoogle(req.user);
    res.redirect(`http://localhost:5173?user=${JSON.stringify(user)}`);
  }

  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  naverAuth() {}

  @Get('naver/callback')
  @UseGuards(AuthGuard('naver'))
  async naverAuthCallback(@Req() req, @Res() res) {
    const user = await this.naverAuthService.loginWithNaver(req.user);
    res.redirect(`http://localhost:5173?user=${JSON.stringify(user)}`);
  }

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  kakaoAuth() {}

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuthCallback(@Req() req, @Res() res) {
    const user = await this.kakaoAuthService.loginWithKakao(req.user);
    res.redirect(`http://localhost:5173?user=${JSON.stringify(user)}`);
  }
}
