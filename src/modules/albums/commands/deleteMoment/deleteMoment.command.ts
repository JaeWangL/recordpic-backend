import { ICommand } from '@nestjs/cqrs';
import { DeleteMomentRequest } from '../../dtos';

export default class DeleteMomentCommand implements ICommand {
  constructor(public readonly req: DeleteMomentRequest) {}
}
