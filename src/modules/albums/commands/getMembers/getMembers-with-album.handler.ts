import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MemberWithAlbumDto } from '../../dtos';
import { MemberService } from '../../services';
import GetMembersWithAlbumQuery from './getMembers-with-album.query';
import { toMembersWithAlbumDTO } from '../member.extensions';

@QueryHandler(GetMembersWithAlbumQuery)
export default class GetMembersWithAlbumHandler
  implements IQueryHandler<GetMembersWithAlbumQuery, MemberWithAlbumDto[]> {
  constructor(private readonly memberSvc: MemberService) {}

  async execute(query: GetMembersWithAlbumQuery): Promise<MemberWithAlbumDto[]> {
    const { userId } = query;

    const members = await this.memberSvc.findByUserIdAsync(userId, true);

    return toMembersWithAlbumDTO(members);
  }
}
