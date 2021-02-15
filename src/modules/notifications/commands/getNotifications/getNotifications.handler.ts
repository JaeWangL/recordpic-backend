import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import PaginatedItemsViewModel from '@common/paginated-Items.viewModel';
import { NotificationPreviewDto } from '../../dtos';
import { NotificationService } from '../../services';
import GetNotificationsQuery from './getNotifications.query';
import { toNotificationsPreviewDTO } from '../notification.extensions';

@QueryHandler(GetNotificationsQuery)
export default class GetNotificationsHandler
  implements IQueryHandler<GetNotificationsQuery, PaginatedItemsViewModel<NotificationPreviewDto>> {
  constructor(private readonly memberSvc: NotificationService) {}

  async execute(query: GetNotificationsQuery): Promise<PaginatedItemsViewModel<NotificationPreviewDto>> {
    const { userId, pageIndex, pageSize } = query;

    const [notifications, totalItems] = await this.memberSvc.findMultipleByUserIdAsync(userId, pageIndex, pageSize);

    return new PaginatedItemsViewModel(pageIndex, pageSize, totalItems, toNotificationsPreviewDTO(notifications));
  }
}
