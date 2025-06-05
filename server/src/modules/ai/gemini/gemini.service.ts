import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class OpenAIService {
  private readonly apiKey: string;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    if (!this.apiKey) {
      throw new Error('OpenAI API Key is required');
    }
  }

  async generateContent(prompt: string): Promise<string> {
    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
          }),
        },
      );

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content.trim();
      } else {
        throw new Error('No response from OpenAI');
      }
    } catch (error) {
      console.error('OpenAI GPT-3.5 Error:', error);
      throw new Error(
        `Failed to generate content from OpenAI: ${error.message}`,
      );
    }
  }
}
