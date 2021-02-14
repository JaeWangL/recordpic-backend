import { Logger, NotFoundException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CommentPreviewDto } from '../../dtos';
import { CommentService } from '../../services';
import { toCommentPreviewDTO } from '../comment.extensions';
import UpdateCommentCommand from './updateComment.command';

@CommandHandler(UpdateCommentCommand)
export default class UpdateCommentHandler implements ICommandHandler<UpdateCommentCommand, CommentPreviewDto> {
  constructor(private readonly commentSvc: CommentService) {}

  async execute(command: UpdateCommentCommand): Promise<CommentPreviewDto> {
    Logger.log('Update Comment...', 'UpdateCommentCommand');
    const { req } = command;

    const comment = await this.commentSvc.findByIdAsync(req.id);
    if (!comment) {
      throw new NotFoundException('comment does not exist');
    }

    comment.updateText(req.text);
    await this.commentSvc.updateAsync(comment);

    return toCommentPreviewDTO(comment);
  }
}
