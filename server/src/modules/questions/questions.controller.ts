import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
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
    return this.questionsService.create(title, content, tags, userId);
  }

  // 2. 특정 유저의 질문 전체 조회
  @Get('user/:id')
  async findAllByUser(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<Question[]> {
    return this.questionsService.findAllByUser(userId);
  }
}
