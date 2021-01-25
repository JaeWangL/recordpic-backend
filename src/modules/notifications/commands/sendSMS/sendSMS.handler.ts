import { Logger } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import NaverService from '@shared/naver/naver.service';
import SendSMSCommand from './sendSMS.command';

@CommandHandler(SendSMSCommand)
export default class SendSMSHandler implements ICommandHandler<SendSMSCommand, boolean> {
  constructor(private readonly naverSvc: NaverService) {}

  async execute(command: SendSMSCommand): Promise<boolean> {
    Logger.log('Send SMS...', 'SendSMSCommand');
    const { req } = command;

    this.naverSvc.sendSMS(req.content, req.toNumbers);

    return true;
  }
}
