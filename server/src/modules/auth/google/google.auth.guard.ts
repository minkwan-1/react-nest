// import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class GoogleAuthGuard extends AuthGuard('google') {
//   private readonly logger = new Logger(GoogleAuthGuard.name);

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const activate = (await super.canActivate(context)) as boolean;
//     const request = context.switchToHttp().getRequest();

//     if (activate) {
//       await super.logIn(request);
//       this.logger.log('로그인 완료');
//     }

//     return activate;
//   }
// }
