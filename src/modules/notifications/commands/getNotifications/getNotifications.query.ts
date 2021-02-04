import { IQuery } from '@nestjs/cqrs';

export default class GetNotificationsPreviewQuery implements IQuery {
  constructor(readonly userId: number, readonly pageIndex: number, readonly pageSize: number) {}
}
