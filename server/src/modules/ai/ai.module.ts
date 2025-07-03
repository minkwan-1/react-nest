import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { AiAnswer } from './ai.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AiAnswer])],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
