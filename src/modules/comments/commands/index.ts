import CreateCommentHandler from './createComment/createComment.handler';
import DeleteCommentHandler from './deleteComment/deleteComment.handler';
import GetCommentsPreviewHandler from './getComments/getComments-preview.handler';
import UpdateCommentHandler from './updateComment/updateComment.handler';

export { default as CreateCommentCommand } from './createComment/createComment.command';
export { default as DeleteCommentCommand } from './deleteComment/deleteComment.command';
export { default as GetCommentsPreviewQuery } from './getComments/getComments-preview.query';
export { default as UpdateCommentCommand } from './updateComment/updateComment.command';
export const AllCommandHandlers = [CreateCommentHandler, DeleteCommentHandler, UpdateCommentHandler];
export const AllQueryHandlers = [GetCommentsPreviewHandler];
