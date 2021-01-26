import Moment from 'moment';
import { Column, Entity } from 'typeorm';
import AbstractEntity from '@common/abstract.entity';

@Entity('Verifications_Phone')
export default class VerificationPhoneEntity extends AbstractEntity {
  @Column({ type: 'nvarchar', length: 16 })
  countryCode: string;

  @Column({ type: 'nvarchar', length: 30, unique: true })
  number: string;

  @Column({ type: 'nvarchar', length: 16 })
  code: string;

  @Column({ type: 'datetimeoffset' })
  expirationDate: Date;

  constructor(countryCode: string, number: string, code: string) {
    super();
    this.countryCode = countryCode;
    this.number = number;
    this.code = code;
    this.expirationDate = Moment(new Date()).add(30, 'minutes').toDate();
  }

  updateCode(code: string): void {
    this.code = code;
    this.updatedAt = new Date();
  }
}
