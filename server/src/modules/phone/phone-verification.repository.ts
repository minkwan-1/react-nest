import { EntityRepository, Repository } from 'typeorm';
import { PhoneVerification } from './phone-verification.entity';

@EntityRepository(PhoneVerification)
export class PhoneVerificationRepository extends Repository<PhoneVerification> {}
