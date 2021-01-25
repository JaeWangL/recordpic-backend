import { IQuery } from '@nestjs/cqrs';

export default class GetMembersPreviewQuery implements IQuery {
  constructor(readonly albumId: number, readonly pageIndex: number, readonly pageSize: number) {}
}
