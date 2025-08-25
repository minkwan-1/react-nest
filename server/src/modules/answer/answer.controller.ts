import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AuthenticatedGuard } from '../auth/guard/authenticated.guard';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @UseGuards(AuthenticatedGuard)
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
