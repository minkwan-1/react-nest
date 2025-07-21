import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { AiAnswer } from './ai.entity';
import { Question } from '../questions/questions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AiAnswer, Question])],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
