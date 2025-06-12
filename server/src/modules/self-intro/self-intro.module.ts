import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelfIntro } from './self-intro.entity';
import { SelfIntroService } from './self-intro.service';
import { SelfIntroController } from './self-intro.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SelfIntro])],
  providers: [SelfIntroService],
  controllers: [SelfIntroController],
})
export class SelfIntroModule {}
