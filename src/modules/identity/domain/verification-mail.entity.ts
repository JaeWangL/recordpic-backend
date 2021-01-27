import Moment from 'moment';
import { Column, Entity } from 'typeorm';
import AbstractEntity from '@common/abstract.entity';

// TODO: Update this features with `Redis`
@Entity('Verifications_Mail')
export default class VerificationMailEntity extends AbstractEntity {
  @Column({ type: 'bigint', unique: true })
  userId: number;

  @Column({ type: 'uniqueidentifier', unique: true })
  code: string;

  @Column({ type: 'datetimeoffset' })
  expirationDate: Date;

  constructor(userId: number, code: string) {
    super();
    this.userId = userId;
    this.code = code;
    this.expirationDate = Moment(new Date()).add(30, 'minutes').toDate();
  }

  updateCode(code: string): void {
    this.code = code;
    this.updatedAt = new Date();
  }
}
