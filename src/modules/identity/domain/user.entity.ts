import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index } from 'typeorm';
import AbstractEntity from '@common/abstract.entity';

@Entity('Users')
export default class UserEntity extends AbstractEntity {
  @ApiProperty({ type: String, maxLength: 256 })
  @Column({ type: 'nvarchar', length: 256 })
  @Index({ unique: true })
  email: string;

  @ApiProperty({ type: String })
  @Column({ type: 'nvarchar', length: 'MAX' })
  passwordHash: string;

  @ApiProperty({ type: Boolean })
  @Column({ type: 'bit' })
  emailConfirmed: boolean;

  constructor(email: string, passwordHash: string) {
    super();
    this.email = email;
    this.passwordHash = passwordHash;
    this.emailConfirmed = false;
  }
}
