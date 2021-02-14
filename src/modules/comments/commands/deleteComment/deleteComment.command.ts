import { ICommand } from '@nestjs/cqrs';
import { DeleteCommentRequest } from '../../dtos';

export default class DeleteCommentCommand implements ICommand {
  constructor(public readonly req: DeleteCommentRequest) {}
}
