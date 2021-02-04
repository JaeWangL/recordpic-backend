import { NotificationDto } from '../dtos';
import { NotificationEntity } from '../domain';

export const toNotificationDTO = (notification: NotificationEntity): NotificationDto => ({
  userId: notification.userId,
  type: notification.type,
  userName: notification.userName,
});

export const toNotificationsDTO = (notifications: NotificationEntity[]): NotificationDto[] =>
  notifications.map((notification) => toNotificationDTO(notification));
