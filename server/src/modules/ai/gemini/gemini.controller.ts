import { Controller, Post, Body } from '@nestjs/common';
import { GoogleGenerativeAIService } from './gemini.service';

@Controller('api/ask-ai')
export class GoogleGenerativeAIController {
  constructor(
    private readonly googleGenerativeAIService: GoogleGenerativeAIService,
  ) {}

  // [POST] AI에게 질문을 요청하는 엔드포인트
  @Post()
  async askAI(@Body('prompt') prompt: string): Promise<{ result: string }> {
    const result = await this.googleGenerativeAIService.generateContent(prompt);

    return { result };
  }
}
