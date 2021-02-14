import { CommentPreviewDto } from '../dtos';
import { CommentEntity } from '../domain';

export const toCommentPreviewDTO = (comment: CommentEntity): CommentPreviewDto => ({
  id: comment.id,
  userId: comment.userId,
  userName: comment.userName,
  userImageUrl: comment.userImageUrl,
  text: comment.text,
  updatedAt: comment.updatedAt,
});

export const toCommentsPreviewDTO = (comments: CommentEntity[]): CommentPreviewDto[] =>
  comments.map((comment) => toCommentPreviewDTO(comment));
