import SendMailHandler from './sendMail/sendMail.handler';
import SendSMSHandler from './sendSMS/sendSMS.handler';

export { default as SendMailCommand } from './sendMail/sendMail.command';
export { default as SendSMSCommand } from './sendSMS/sendSMS.command';
export const AllCommandHandlers = [SendMailHandler, SendSMSHandler];
