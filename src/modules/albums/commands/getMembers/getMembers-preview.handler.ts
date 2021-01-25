import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import PaginatedItemsViewModel from '@common/paginated-Items.viewModel';
import { MemberPreviewDto } from '../../dtos';
import { MemberService } from '../../services';
import GetMembersPreviewQuery from './getMembers-preview.query';
import { toMembersPreviewDTO } from '../member.extensions';

@QueryHandler(GetMembersPreviewQuery)
export default class GetMembersPreviewHandler
  implements IQueryHandler<GetMembersPreviewQuery, PaginatedItemsViewModel<MemberPreviewDto>> {
  constructor(private readonly memberSvc: MemberService) {}

  async execute(query: GetMembersPreviewQuery): Promise<PaginatedItemsViewModel<MemberPreviewDto>> {
    const { albumId, pageIndex, pageSize } = query;

    const [members, totalItems] = await this.memberSvc.findByAlbumIdAsync(albumId, pageIndex, pageSize);

    return new PaginatedItemsViewModel(pageIndex, pageSize, totalItems, toMembersPreviewDTO(members));
  }
}
