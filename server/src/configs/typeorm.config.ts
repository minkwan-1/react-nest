import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Question } from 'src/modules/questions/questions.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'react-nest',
  entities: [Question],
  synchronize: true, // 개발 환경에서만 true (프로덕션에서는 false로 설정)
};
