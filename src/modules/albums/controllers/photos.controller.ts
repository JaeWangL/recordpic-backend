import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAccessGuard from '@infrastructure/guards/jwt-access.guard';
import { DeletePhotoCommand, GetPhotosPreviewQuery } from '../commands';
import { DeletePhotoRequest, PhotoPreviewDto } from '../dtos';

@ApiTags('Photos')
@Controller('photos')
@ApiBearerAuth()
export default class PhotosController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get('moment/:momentId')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Get Photos Preview By MomentId' })
  @ApiResponse({ status: HttpStatus.OK, type: [PhotoPreviewDto], description: 'Get Photos Preview By MomentId.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async getPhotosPreview(@Param('momentId') momentId: number): Promise<PhotoPreviewDto[]> {
    const members: PhotoPreviewDto[] = await this.queryBus.execute(new GetPhotosPreviewQuery(momentId));

    return members;
  }

  @Delete()
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Delete Photo' })
  @ApiResponse({ status: HttpStatus.OK, type: Boolean, description: 'The photo is successfully deleted.' })
  async deleteAlbum(@Body() req: DeletePhotoRequest): Promise<boolean> {
    if (req === undefined) {
      throw new BadRequestException();
    }
    const result: boolean = await this.commandBus.execute(new DeletePhotoCommand(req));

    return result;
  }
}
