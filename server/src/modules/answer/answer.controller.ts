// answer.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AnswerService } from './answer.service';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  async createAnswer(@Body() body: { questionId: number; content: string }) {
    const { questionId, content } = body;
    return await this.answerService.createOrUpdateAnswer(
      questionId.toString(),
      content,
    );
  }
}
