import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// 엔티티 및 레포지토리
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

// 서비스
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],

  providers: [UsersService, UsersRepository],

  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
