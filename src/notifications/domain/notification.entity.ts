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

  @Column({ type: 'nvarchar', length: 30 })
  memberName: string;

  @Column({ type: 'nvarchar', length: 'MAX', nullable: true })
  memberImageUrl?: string;

  @Column({ type: 'bigint', nullable: true })
  albumId?: number;

  @Column({ type: 'bigint', nullable: true })
  momentId?: number;

  constructor(
    userId: number,
    type: NotificationType,
    memberName: string,
    memberImageUrl?: string,
    albumId?: number,
    momentId?: number,
  ) {
    super();
    this.userId = userId;
    this.type = parseNotificationType(type);
    this.memberName = memberName;
    this.memberImageUrl = memberImageUrl;
    this.albumId = albumId;
    this.momentId = momentId;
  }
}
