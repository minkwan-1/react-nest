import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('kakao_user')
export class KakaoUser {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

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
