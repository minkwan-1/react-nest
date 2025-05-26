import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GoogleGenerativeAIService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error('API Key is required');
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  // [1] 콘텐츠 생성 메소드
  async generateContent(prompt: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-1.5-pro',
      });

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      return text;
    } catch (error) {
      console.error('Google Generative AI Error:', error);
      throw new Error(
        `Failed to generate content from Google Generative AI: ${error.message}`,
      );
    }
  }
}
