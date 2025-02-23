import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('kakao_user')
export class KakaoUser {
  @PrimaryGeneratedColumn('uuid') // 자동 생성되는 UUID 값
  id: string;

  @Column({ type: 'timestamptz' })
  connectedAt: Date;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  profileImage?: string;

  @Column({ nullable: true })
  thumbnailImage?: string;

  @Column({ default: false })
  isDefaultImage: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
