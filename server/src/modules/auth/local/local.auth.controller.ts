import { Controller, Post, Body } from '@nestjs/common';
import { LocalAuthService } from './local.auth.service';

@Controller('auth')
export class LocalAuthController {
  constructor(private readonly localAuthService: LocalAuthService) {}

  @Post('signup')
  async signup(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const newUser = await this.localAuthService.signup(email, password);
    console.log('New user registered:', newUser);

    return { message: '회원가입 성공', user: { email: newUser.email } };
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.localAuthService.login(email, password);
    console.log('User logged in:', user);

    return { message: '로그인 성공', user: { email: user.email } };
  }
}
