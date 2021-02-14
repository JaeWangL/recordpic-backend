import { ICommand } from '@nestjs/cqrs';
import { UpdateCommentRequest } from '../../dtos';

export default class UpdateCommentCommand implements ICommand {
  constructor(public readonly req: UpdateCommentRequest) {}
}
