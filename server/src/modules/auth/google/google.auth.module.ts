import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleUser } from './google.auth.entity';
import { GoogleAuthRepository } from './google.auth.repository';
import { GoogleAuthController } from './google.auth.controller';
import { GoogleAuthService } from './google.auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([GoogleUser])],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService, GoogleAuthRepository],
  exports: [GoogleAuthService],
})
export class GoogleAuthModule {}
