import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import PaginatedItemsViewModel from '@common/paginated-Items.viewModel';
import { CommentPreviewDto } from '../../dtos';
import { CommentService } from '../../services';
import GetCommentsPreviewQuery from './getComments-preview.query';
import { toCommentsPreviewDTO } from '../comment.extensions';

@QueryHandler(GetCommentsPreviewQuery)
export default class GetCommentsPreviewHandler
  implements IQueryHandler<GetCommentsPreviewQuery, PaginatedItemsViewModel<CommentPreviewDto>> {
  constructor(private readonly commentSvc: CommentService) {}

  async execute(query: GetCommentsPreviewQuery): Promise<PaginatedItemsViewModel<CommentPreviewDto>> {
    const { momentId, pageIndex, pageSize } = query;

    const [comments, totalItems] = await this.commentSvc.findByMomentIdAsync(momentId, pageIndex, pageSize);

    return new PaginatedItemsViewModel(pageIndex, pageSize, totalItems, toCommentsPreviewDTO(comments));
  }
}
