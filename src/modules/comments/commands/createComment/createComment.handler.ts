import { Logger } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CommentEntity } from '../../domain';
import { CommentPreviewDto } from '../../dtos';
import { CommentService } from '../../services';
import { toCommentPreviewDTO } from '../comment.extensions';
import CreateCommentCommand from './createComment.command';

@CommandHandler(CreateCommentCommand)
export default class CreateCommentHandler implements ICommandHandler<CreateCommentCommand, CommentPreviewDto> {
  constructor(private readonly commentSvc: CommentService) {}

  async execute(command: CreateCommentCommand): Promise<CommentPreviewDto> {
    Logger.log('Create Comment...', 'CreateCommentCommand');
    const { req } = command;

    const newComment = new CommentEntity(
      req.albumId,
      req.momentId,
      req.userId,
      req.userName,
      req.text,
      req.userImageUrl,
    );

    await this.commentSvc.createAsync(newComment);

    return toCommentPreviewDTO(newComment);
  }
}
