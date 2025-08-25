import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();

    console.log(
      'AuthenticatedGuard의 request 확인: ',
      (req as any).isAuthenticated(),
    );

    if (!(req as any).isAuthenticated()) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
