import { NotificationPreviewDto } from '../dtos';
import { NotificationEntity } from '../domain';

export const toNotificationPreviewDTO = (notification: NotificationEntity): NotificationPreviewDto => ({
  type: notification.type,
  memberName: notification.memberName,
  memberImageUrl: notification.memberImageUrl,
  albumId: notification.albumId,
  momentId: notification.momentId,
});

export const toNotificationsPreviewDTO = (notifications: NotificationEntity[]): NotificationPreviewDto[] =>
  notifications.map((notification) => toNotificationPreviewDTO(notification));
