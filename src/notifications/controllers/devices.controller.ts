import { BadRequestException, Body, Controller, Delete, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAccessGuard from '@infrastructure/guards/jwt-access.guard';
import { CreateDeviceCommand, DeleteDeviceCommand } from '../commands';
import { CreateDeviceRequest, DeleteDeviceRequest, DevicePreviewDto } from '../dtos';

@ApiTags('Devices')
@Controller('devices')
export default class DevicesController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Create Device' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DevicePreviewDto,
    description: 'New device is successfully created.',
  })
  async createDevice(@Body() req: CreateDeviceRequest): Promise<DevicePreviewDto> {
    if (req === undefined) {
      throw new BadRequestException();
    }
    const notification: DevicePreviewDto = await this.commandBus.execute(new CreateDeviceCommand(req));

    return notification;
  }

  @Delete()
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Delete Device' })
  @ApiResponse({ status: HttpStatus.OK, type: Boolean, description: 'The device is successfully deleted.' })
  async deleteDevice(@Body() req: DeleteDeviceRequest): Promise<boolean> {
    if (req === undefined) {
      throw new BadRequestException();
    }
    const result: boolean = await this.commandBus.execute(new DeleteDeviceCommand(req));

    return result;
  }
}
