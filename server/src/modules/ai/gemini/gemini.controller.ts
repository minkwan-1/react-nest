import { Controller, Post, Body } from '@nestjs/common';
import { OpenAIService } from './gemini.service';

@Controller('api/ask-ai')
export class OpenAIController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post()
  async askAI(@Body('prompt') prompt: string): Promise<{ result: string }> {
    const result = await this.openAIService.generateContent(prompt);
    return { result };
  }
}
