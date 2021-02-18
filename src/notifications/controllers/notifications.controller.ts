import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import PaginatedItemsViewModel from '@common/paginated-Items.viewModel';
import JwtAccessGuard from '@infrastructure/guards/jwt-access.guard';
import {
  CreateNotificationCommand,
  DeleteNotificationCommand,
  GetNotificationsQuery,
  SendMailCommand,
  SendSMSCommand,
} from '../commands';
import {
  CreateNotificationRequest,
  DeleteNotificationRequest,
  NotificationPreviewDto,
  SendMailRequest,
  SendSMSRequest,
} from '../dtos';

@ApiTags('Notifications')
@Controller('notifications')
export default class NotificationsController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get('user/:userId')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Get Notifications By UserId' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get Notifications By UserId.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async getMembersWithAlbum(
    @Param('userId') userId: number,
    @Query('pageIndex') pageIndex = 0,
    @Query('pageSize') pageSize = 10,
  ): Promise<PaginatedItemsViewModel<NotificationPreviewDto>> {
    const notifications: PaginatedItemsViewModel<NotificationPreviewDto> = await this.queryBus.execute(
      new GetNotificationsQuery(userId, pageIndex, pageSize),
    );

    return notifications;
  }

  @Post()
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Create Notification' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: NotificationPreviewDto,
    description: 'New notification is successfully created.',
  })
  async createNotification(@Body() req: CreateNotificationRequest): Promise<NotificationPreviewDto> {
    if (req === undefined) {
      throw new BadRequestException();
    }
    const notification: NotificationPreviewDto = await this.commandBus.execute(new CreateNotificationCommand(req));

    return notification;
  }

  @Post('mail')
  @ApiOperation({ summary: 'Send Mail' })
  @ApiResponse({ status: HttpStatus.OK, type: Boolean, description: 'Mail is successfully sent.' })
  async sendMail(@Body() req: SendMailRequest): Promise<boolean> {
    if (req === undefined) {
      throw new BadRequestException();
    }
    const result: boolean = await this.commandBus.execute(new SendMailCommand(req));

    return result;
  }

  @Post('sms')
  @ApiOperation({ summary: 'Send SMS' })
  @ApiResponse({ status: HttpStatus.OK, type: Boolean, description: 'SMS is successfully sent.' })
  async sendSMS(@Body() req: SendSMSRequest): Promise<boolean> {
    if (req === undefined) {
      throw new BadRequestException();
    }
    const result: boolean = await this.commandBus.execute(new SendSMSCommand(req));

    return result;
  }

  @Delete()
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Delete Notification' })
  @ApiResponse({ status: HttpStatus.OK, type: Boolean, description: 'The notification is successfully deleted.' })
  async deleteNotification(@Body() req: DeleteNotificationRequest): Promise<boolean> {
    if (req === undefined) {
      throw new BadRequestException();
    }
    const result: boolean = await this.commandBus.execute(new DeleteNotificationCommand(req));

    return result;
  }
}
