import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('self_intro')
export class SelfIntro {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  userId: string;

  @Column({ length: 80 })
  content: string;
}
