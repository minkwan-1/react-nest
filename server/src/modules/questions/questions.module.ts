import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// 엔티티
import { Question } from './questions.entity';

// 서비스 및 컨트롤러
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';

import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), UsersModule],

  controllers: [QuestionsController],

  providers: [QuestionsService],
})
export class QuestionsModule {}
