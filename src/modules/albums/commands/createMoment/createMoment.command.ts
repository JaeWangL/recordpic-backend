import { ICommand } from '@nestjs/cqrs';
import { CreateMomentRequest } from '../../dtos';

export default class CreateMomentCommand implements ICommand {
  constructor(public readonly req: CreateMomentRequest) {}
}
