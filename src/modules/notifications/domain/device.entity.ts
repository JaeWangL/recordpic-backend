import { Column, Entity } from 'typeorm';
import AbstractEntity from '@common/abstract.entity';
import { DeviceTokenType } from '@common/enum-types';
import { parseDeviceType } from '@infrastructure/utils';

@Entity('Devices')
export default class DeviceEntity extends AbstractEntity {
  @Column({ type: 'bigint' })
  userId: number;

  @Column({ type: 'tinyint', enum: DeviceTokenType })
  type: DeviceTokenType;

  @Column({ type: 'nvarchar', length: 'MAX' })
  deviceToken: string;

  constructor(userId: number, type: DeviceTokenType, deviceToken: string) {
    super();
    this.userId = userId;
    this.type = parseDeviceType(type);
    this.deviceToken = deviceToken;
  }

  updateToken(deviceToken: string): void {
    this.deviceToken = deviceToken;
    this.updatedAt = new Date();
  }
}
