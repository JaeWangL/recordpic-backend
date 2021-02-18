import { ICommand } from '@nestjs/cqrs';
import { DeleteNotificationRequest } from '../../dtos';

export default class DeleteNotificationCommand implements ICommand {
  constructor(public readonly req: DeleteNotificationRequest) {}
}
