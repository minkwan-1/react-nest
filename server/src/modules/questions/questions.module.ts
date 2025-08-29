import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './questions.entity';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';

import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), UsersModule],

  controllers: [QuestionsController],

  providers: [QuestionsService],
})
export class QuestionsModule {}
