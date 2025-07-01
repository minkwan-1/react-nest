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

  // 닉네임
  @Column({ type: 'varchar', length: 100, nullable: true })
  nickname: string;

  // 프로필 이미지 URL
  @Column({ type: 'varchar', nullable: true })
  profileImageUrl: string;

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
