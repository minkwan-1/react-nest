import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyInfo } from './myInfo.entity';
import { MyInfoService } from './myInfo.service';
import { MyInfoController } from './myInfo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MyInfo])],
  providers: [MyInfoService],
  controllers: [MyInfoController],
})
export class MyInfoModule {}
