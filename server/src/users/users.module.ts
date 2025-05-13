import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// 1. 유저 엔티티 및 레포지토리
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

// 2. 서비스
import { UsersService } from './users.service';

@Module({
  // TypeORM에서 유저 엔티티 사용 가능하게 등록
  imports: [TypeOrmModule.forFeature([User])],

  // 비즈니스 로직 및 DB 레이어 주입
  providers: [UsersService, UsersRepository],

  // 외부에서 UsersService를 사용할 수 있도록 export
  exports: [UsersService],
})
export class UsersModule {}
