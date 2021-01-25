import { IQuery } from '@nestjs/cqrs';

export default class GetMembersWithAlbumQuery implements IQuery {
  constructor(readonly userId: number) {}
}
