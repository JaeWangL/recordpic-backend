import { Column, Entity } from 'typeorm';
import AbstractEntity from '@common/abstract.entity';

@Entity('Tokens')
export default class TokenEntity extends AbstractEntity {
  @Column({ type: 'bigint' })
  userId: number;

  /**
   * NOTE
   * 0: Web
   * 1: Mobile
   */
  @Column({ type: 'tinyint' })
  type: number;

  @Column({ type: 'nvarchar', length: 1024 })
  refreshToken: string;

  @Column({ type: 'datetimeoffset' })
  expirationDate: Date;

  constructor(userId: number, type: number, refreshToken: string, expirationDate: Date) {
    super();
    this.userId = userId;
    this.type = type;
    this.refreshToken = refreshToken;
    this.expirationDate = expirationDate;
  }

  updateToken(newRefreshToken: string): void {
    this.refreshToken = newRefreshToken;
    this.updatedAt = new Date();
  }
}
