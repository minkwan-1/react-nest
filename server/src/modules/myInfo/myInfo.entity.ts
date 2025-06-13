import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('my_info')
export class MyInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 유저 아이디
  @Column({ unique: true })
  userId: string;

  // 직업
  @Column({ type: 'varchar', length: 100, nullable: true })
  job: string;

  // 관심 분야 (문자열 배열로 저장)
  @Column({ type: 'text', array: true, default: [] })
  interests: string[];

  // 소셜 링크 (문자열 배열로 저장)
  @Column({ type: 'text', array: true, default: [] })
  socialLinks: string[];

  // 생성일시
  @CreateDateColumn()
  createdAt: Date;

  // 수정일시
  @UpdateDateColumn()
  updatedAt: Date;
}
