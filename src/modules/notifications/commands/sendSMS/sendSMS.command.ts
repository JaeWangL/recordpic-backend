import { ICommand } from '@nestjs/cqrs';
import { SendSMSRequest } from '../../dtos';

export default class SendSMSCommand implements ICommand {
  constructor(public readonly req: SendSMSRequest) {}
}
