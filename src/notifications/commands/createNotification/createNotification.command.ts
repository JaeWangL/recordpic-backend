import { ICommand } from '@nestjs/cqrs';
import { CreateNotificationRequest } from '../../dtos';

export default class CreateNotificationCommand implements ICommand {
  constructor(public readonly req: CreateNotificationRequest) {}
}
