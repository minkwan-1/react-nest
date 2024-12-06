import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { Question } from './questions.entity';
import { QuestionsService } from './questions.service';

// http://localhost:3000/questions
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  async create(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('tags') tags: string[],
  ): Promise<Question> {
    return this.questionsService.create(title, content, tags);
  }

  @Get()
  async findAll(): Promise<Question[]> {
    return this.questionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Question | string> {
    const question = this.questionsService.findOne(+id);
    if (!question) {
      return `Question with id ${id} not found`;
    }
    return question;
  }
}
