import { Logger } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CommentService } from '../../services';
import DeleteCommentCommand from './deleteComment.command';

@CommandHandler(DeleteCommentCommand)
export default class DeleteCommentHandler implements ICommandHandler<DeleteCommentCommand, boolean> {
  constructor(private readonly commentSvc: CommentService) {}

  async execute(command: DeleteCommentCommand): Promise<boolean> {
    Logger.log('Delet Comment...', 'DeletCommentCommand');
    const { req } = command;

    await this.commentSvc.deleteByIdAsync(req.id);

    return true;
  }
}
