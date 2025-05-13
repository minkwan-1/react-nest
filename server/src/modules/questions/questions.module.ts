import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// 1. 질문 관련 엔티티
import { Question } from './questions.entity';

// 2. 질문 관련 서비스 및 컨트롤러
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';

@Module({
  // TypeORM에 Question 엔티티 등록
  imports: [TypeOrmModule.forFeature([Question])],

  // REST API 라우팅 처리
  controllers: [QuestionsController],

  // 비즈니스 로직 처리
  providers: [QuestionsService],
})
export class QuestionsModule {}
