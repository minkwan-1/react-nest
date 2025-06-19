// answer.controller.ts
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { AnswerService } from './answer.service';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  async createAnswer(
    @Body() body: { questionId: string; content: string; userId: string },
  ) {
    return await this.answerService.createAnswer(body);
  }

  @Get('question/:questionId')
  async getAnswersByQuestionId(@Param('questionId') questionId: string) {
    return await this.answerService.getAnswersByQuestionId(questionId);
  }
}
