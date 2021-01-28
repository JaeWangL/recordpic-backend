import { ICommand } from '@nestjs/cqrs';
import { UpdateMomentRequest } from '../../dtos';

export default class UpdateMomentCommand implements ICommand {
  constructor(public readonly req: UpdateMomentRequest) {}
}
