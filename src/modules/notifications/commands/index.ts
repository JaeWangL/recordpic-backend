import CreateNotificationHandler from './createNotification/createNotification.handler';
import SendMailHandler from './sendMail/sendMail.handler';
import SendSMSHandler from './sendSMS/sendSMS.handler';
import GetNotificationsHandler from './getNotifications/getNotifications.handler';

export { default as CreateNotificationCommand } from './createNotification/createNotification.command';
export { default as SendMailCommand } from './sendMail/sendMail.command';
export { default as SendSMSCommand } from './sendSMS/sendSMS.command';
export { default as GetNotificationsQuery } from './getNotifications/getNotifications.query';
export const AllCommandHandlers = [CreateNotificationHandler, SendMailHandler, SendSMSHandler];
export const AllQueryHandlers = [GetNotificationsHandler];
