import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GoogleGenerativeAIService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    // 1. API Key 검증
    if (!apiKey) {
      throw new Error('API Key is required');
    }
    // 2. GoogleGenerativeAI 인스턴스 생성
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  // 3. 콘텐츠 생성 메소드
  async generateContent(prompt: string): Promise<string> {
    try {
      // 4. AI 모델 선택 및 콘텐츠 생성
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-1.5-pro',
      });

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text(); // 5. 생성된 콘텐츠 추출

      // 6. 생성된 콘텐츠 반환
      return text;
    } catch (error) {
      // 7. 에러 처리
      console.error('Google Generative AI Error:', error);
      throw new Error(
        `Failed to generate content from Google Generative AI: ${error.message}`,
      );
    }
  }
}
