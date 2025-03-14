import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleUser } from './google.auth.entity';
import { GoogleAuthRepository } from './google.auth.repository';
import { GoogleAuthController } from './google.auth.controller';
import { GoogleAuthService } from './google.auth.service';
import { AuthModule } from '../auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GoogleUser]),
    forwardRef(() => AuthModule),
  ],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService, GoogleAuthRepository],
  exports: [GoogleAuthService],
})
export class GoogleAuthModule {}
