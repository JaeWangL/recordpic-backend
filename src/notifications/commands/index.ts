import CreateDeviceHandler from './createDevice/createDevice.handler';
import CreateNotificationHandler from './createNotification/createNotification.handler';
import DeleteDeviceHandler from './deleteDevice/deleteDevice.handler';
import DeleteNotificationHandler from './deleteNotification/deleteNotification.handler';
import SendMailHandler from './sendMail/sendMail.handler';
import SendSMSHandler from './sendSMS/sendSMS.handler';
import GetNotificationsHandler from './getNotifications/getNotifications.handler';

export { default as CreateDeviceCommand } from './createDevice/createDevice.command';
export { default as CreateNotificationCommand } from './createNotification/createNotification.command';
export { default as DeleteDeviceCommand } from './deleteDevice/deleteDevice.command';
export { default as DeleteNotificationCommand } from './deleteNotification/deleteNotification.command';
export { default as SendMailCommand } from './sendMail/sendMail.command';
export { default as SendSMSCommand } from './sendSMS/sendSMS.command';
export { default as GetNotificationsQuery } from './getNotifications/getNotifications.query';
export const AllCommandHandlers = [
  CreateDeviceHandler,
  CreateNotificationHandler,
  DeleteDeviceHandler,
  DeleteNotificationHandler,
  SendMailHandler,
  SendSMSHandler,
];
export const AllQueryHandlers = [GetNotificationsHandler];
