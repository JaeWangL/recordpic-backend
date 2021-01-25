import { Logger } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import SendGridService from '@shared/sendgrid/sendgrid.service';
import SendMailCommand from './sendMail.command';

@CommandHandler(SendMailCommand)
export default class SendMailHandler implements ICommandHandler<SendMailCommand, boolean> {
  constructor(private readonly sgSvc: SendGridService) {}

  async execute(command: SendMailCommand): Promise<boolean> {
    Logger.log('Send Mail...', 'SendMailCommand');
    const { req } = command;

    if (req.htmlText) {
      await this.sgSvc.sendHtmlMailAsync(req.to, req.subject, req.htmlText);

      return true;
    }
    if (req.text) {
      await this.sgSvc.sendMailAsync(req.to, req.subject, req.text);

      return true;
    }

    return false;
  }
}
