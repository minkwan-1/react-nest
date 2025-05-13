import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { GoogleUser } from './google.auth.entity';
import { GoogleAuthRepository } from './google.auth.repository';
import { GoogleAuthController } from './google.auth.controller';
import { GoogleAuthService } from './google.auth.service';
import { GoogleUserSerializer } from './google.auth.serializer';
import { AuthModule } from '../auth.module';
import { UsersModule } from 'src/users/users.module';
// import { GoogleStrategy } from './google.auth.strategy';
// import { GoogleAuthGuard } from './google.auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([GoogleUser]),
    PassportModule.register({ session: true }),
    forwardRef(() => AuthModule),
    UsersModule,
  ],
  controllers: [GoogleAuthController],
  providers: [
    GoogleAuthService,
    GoogleAuthRepository,
    // GoogleStrategy,
    GoogleUserSerializer,
    // GoogleAuthGuard,
  ],
  exports: [GoogleAuthService],
})
export class GoogleAuthModule {}
