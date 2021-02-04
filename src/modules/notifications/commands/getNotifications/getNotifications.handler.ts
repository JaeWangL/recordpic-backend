import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import PaginatedItemsViewModel from '@common/paginated-Items.viewModel';
import { NotificationDto } from '../../dtos';
import { NotificationService } from '../../services';
import GetNotificationsQuery from './getNotifications.query';
import { toNotificationsDTO } from '../notification.extensions';

@QueryHandler(GetNotificationsQuery)
export default class GetNotificationsHandler
  implements IQueryHandler<GetNotificationsQuery, PaginatedItemsViewModel<NotificationDto>> {
  constructor(private readonly memberSvc: NotificationService) {}

  async execute(query: GetNotificationsQuery): Promise<PaginatedItemsViewModel<NotificationDto>> {
    const { userId, pageIndex, pageSize } = query;

    const [notifications, totalItems] = await this.memberSvc.findMultipleByUserIdAsync(userId, pageIndex, pageSize);

    return new PaginatedItemsViewModel(pageIndex, pageSize, totalItems, toNotificationsDTO(notifications));
  }
}
