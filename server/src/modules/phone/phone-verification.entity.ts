import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('phone')
export class PhoneVerification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 6 })
  code: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @Column({ type: 'boolean', default: false })
  verified: boolean;
}
