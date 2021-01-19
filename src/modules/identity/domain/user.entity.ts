import { Column, Entity, Index } from 'typeorm';
import AbstractEntity from '@common/abstract.entity';

@Entity('Users')
export default class UserEntity extends AbstractEntity {
  @Column({ type: 'nvarchar', length: 256 })
  @Index({ unique: true })
  email: string;

  @Column({ type: 'nvarchar', length: 'MAX' })
  passwordHash: string;

  @Column({ type: 'bit' })
  emailConfirmed: boolean;

  constructor(email: string, passwordHash: string) {
    super();
    this.email = email;
    this.passwordHash = passwordHash;
    this.emailConfirmed = false;
  }
}
