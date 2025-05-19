import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UserSession } from './session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSession]),
    PassportModule.register({ session: true }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class SessionModule {}
