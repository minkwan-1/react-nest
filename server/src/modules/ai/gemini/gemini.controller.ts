import { Controller, Post, Body } from '@nestjs/common';
import { GoogleGenerativeAIService } from './gemini.service';

@Controller('api/ask-ai')
export class GoogleGenerativeAIController {
  constructor(
    private readonly googleGenerativeAIService: GoogleGenerativeAIService,
  ) {}

  // 1. AI에게 질문을 요청하는 엔드포인트
  @Post()
  async askAI(@Body('prompt') prompt: string): Promise<{ result: string }> {
    // 2. 질문(prompt)을 AI 서비스로 전달하여 결과를 받아옴
    const result = await this.googleGenerativeAIService.generateContent(prompt);

    // 3. AI로부터 받은 결과를 반환
    return { result };
  }
}
