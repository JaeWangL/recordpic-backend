import { ICommand } from '@nestjs/cqrs';
import { SendMailRequest } from '../../dtos';

export default class SendMailCommand implements ICommand {
  constructor(public readonly req: SendMailRequest) {}
}
