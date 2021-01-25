import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import PaginatedItemsViewModel from '@common/paginated-Items.viewModel';
import { MomentPreviewDto } from '../../dtos';
import { MomentService } from '../../services';
import GetMomentsPreviewQuery from './getMoments-preview.query';
import { toMomentsPreviewDTO } from '../moment.extensions';

@QueryHandler(GetMomentsPreviewQuery)
export default class GetMomentsPreviewHandler
  implements IQueryHandler<GetMomentsPreviewQuery, PaginatedItemsViewModel<MomentPreviewDto>> {
  constructor(private readonly momentSvc: MomentService) {}

  async execute(query: GetMomentsPreviewQuery): Promise<PaginatedItemsViewModel<MomentPreviewDto>> {
    const { albumId, pageIndex, pageSize } = query;

    const [moments, totalItems] = await this.momentSvc.findByAlbumIdAsync(albumId, true, pageIndex, pageSize);

    return new PaginatedItemsViewModel(pageIndex, pageSize, totalItems, toMomentsPreviewDTO(moments));
  }
}
