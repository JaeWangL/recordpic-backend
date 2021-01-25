import { BadRequestException, Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendMailCommand, SendSMSCommand } from '../commands';
import { SendMailRequest, SendSMSRequest } from '../dtos';

@ApiTags('Notifications')
@Controller('notifications')
export default class NotificationsController {
  constructor(private readonly commandBus: CommandBus) {}

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

  @Post('mail')
  @ApiOperation({ summary: 'Send SMS' })
  @ApiResponse({ status: HttpStatus.OK, type: Boolean, description: 'SMS is successfully sent.' })
  async sendSMS(@Body() req: SendSMSRequest): Promise<boolean> {
    if (req === undefined) {
      throw new BadRequestException();
    }
    const result: boolean = await this.commandBus.execute(new SendSMSCommand(req));

    return result;
  }
}
