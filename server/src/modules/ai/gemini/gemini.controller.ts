import { Controller, Post, Body } from '@nestjs/common';
import { GoogleGenerativeAIService } from './gemini.service';

@Controller('api/ask-ai')
export class GoogleGenerativeAIController {
  constructor(
    private readonly googleGenerativeAIService: GoogleGenerativeAIService,
  ) {}

  @Post()
  async askAI(@Body('prompt') prompt: string): Promise<{ result: string }> {
    try {
      const result =
        await this.googleGenerativeAIService.generateContent(prompt);
      return { result };
    } catch (error) {
      console.error('Error in GoogleGenerativeAIController:', error);
      return { result: 'Failed to generate content from Google Generative AI' };
    }
  }
}
