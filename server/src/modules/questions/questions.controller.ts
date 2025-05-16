import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { Question } from './questions.entity';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  // 1. 질문 생성
  @Post()
  async create(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('tags') tags: string[],
    @Body('userId') userId: string,
  ): Promise<Question> {
    // 2. Service에서 생성된 질문 반환
    return this.questionsService.create(title, content, tags, userId);
  }

  // 3. 모든 질문 조회
  @Get()
  async findAll(): Promise<Question[]> {
    // 4. Service에서 모든 질문 목록 반환
    return this.questionsService.findAll();
  }

  // 5. 특정 질문 조회
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Question | string> {
    // 6. ID로 질문 조회
    const question = await this.questionsService.findOne(+id);
    // 7. 질문이 없으면 오류 메시지 반환
    if (!question) {
      return `Question with id ${id} not found`;
    }
    // 8. 질문이 있으면 해당 질문 반환
    return question;
  }

  // 9. 특정 질문 삭제
  // 10. DELETE endpoint로 질문 삭제
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    // 11. ID로 질문 조회
    const question = await this.questionsService.findOne(+id);
    if (!question) {
      // 12. 질문이 없으면 오류 메시지 반환
      return `Question with id ${id} not found`;
    }
    // 13. Service에서 질문 삭제
    await this.questionsService.remove(+id);
    // 14. 삭제 완료 메시지 반환
    return `Question with id ${id} has been deleted successfully`;
  }
}
