import { Column, Entity } from 'typeorm';
import AbstractEntity from '@common/abstract.entity';
import { NotificationType } from '@common/enum-types';
import { parseNotificationType } from '@infrastructure/utils';

// TODO: replace with MongoDB
@Entity('Notifications')
export default class NotificationEntity extends AbstractEntity {
  @Column({ type: 'bigint' })
  userId: number;

  @Column({ type: 'tinyint', enum: NotificationType })
  type: NotificationType;

  userName: string;

  constructor(userId: number, type: NotificationType, userName: string) {
    super();
    this.userId = userId;
    this.type = parseNotificationType(type);
    this.userName = userName;
  }
}
