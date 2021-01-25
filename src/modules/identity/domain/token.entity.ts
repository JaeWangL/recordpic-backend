import { Column, Entity } from 'typeorm';
import AbstractEntity from '@common/abstract.entity';
import { SignInType } from '@common/enum-types';
import { parseType } from '@infrastructure/utils';

@Entity('Tokens')
export default class TokenEntity extends AbstractEntity {
  @Column({ type: 'bigint' })
  userId: number;

  @Column({ type: 'tinyint', enum: SignInType })
  type: SignInType;

  @Column({ type: 'nvarchar', length: 1024 })
  refreshToken: string;

  @Column({ type: 'datetimeoffset' })
  expirationDate: Date;

  constructor(userId: number, type: SignInType, refreshToken: string, expirationDate: Date) {
    super();
    this.userId = userId;
    this.type = parseType(type);
    this.refreshToken = refreshToken;
    this.expirationDate = expirationDate;
  }

  updateToken(newRefreshToken: string): void {
    this.refreshToken = newRefreshToken;
    this.updatedAt = new Date();
  }
}
