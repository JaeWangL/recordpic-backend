import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Query,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import PaginatedItemsViewModel from '@common/paginated-Items.viewModel';
import JwtAccessGuard from '@infrastructure/guards/jwt-access.guard';
import { ApiPaginatedResponse } from '@infrastructure/decorators';
import { CreateMomentCommand, DeleteMomentCommand, GetMomentsPreviewQuery, UpdateMomentCommand } from '../commands';
import { MomentPreviewDto, CreateMomentRequest, DeleteMomentRequest, UpdateMomentRequest } from '../dtos';

@ApiTags('Moments')
@Controller('moments')
@ApiBearerAuth()
export default class MomentsController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get('album/:albumId')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Get Moments Preview By AlbumId' })
  @ApiPaginatedResponse(MomentPreviewDto)
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async getMomentsPreview(
    @Param('albumId') albumId: number,
    @Query('pageIndex') pageIndex = 0,
    @Query('pageSize') pageSize = 10,
  ): Promise<PaginatedItemsViewModel<MomentPreviewDto>> {
    const moments: PaginatedItemsViewModel<MomentPreviewDto> = await this.queryBus.execute(
      new GetMomentsPreviewQuery(albumId, pageIndex, pageSize),
    );

    return moments;
  }

  @Post()
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Create Moment' })
  @ApiResponse({ status: HttpStatus.OK, type: MomentPreviewDto, description: 'New moment is successfully created.' })
  async createMoment(@Body() req: CreateMomentRequest): Promise<MomentPreviewDto> {
    if (req === undefined) {
      throw new BadRequestException();
    }
    const moment: MomentPreviewDto = await this.commandBus.execute(new CreateMomentCommand(req));

    return moment;
  }

  @Delete()
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Delete Moment' })
  @ApiResponse({ status: HttpStatus.OK, type: Boolean, description: 'The moment is successfully deleted.' })
  async deleteAlbum(@Body() req: DeleteMomentRequest): Promise<boolean> {
    if (req === undefined) {
      throw new BadRequestException();
    }
    const result: boolean = await this.commandBus.execute(new DeleteMomentCommand(req));

    return result;
  }

  @Put()
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Update Moment' })
  @ApiResponse({ status: HttpStatus.OK, type: MomentPreviewDto, description: 'The moment is successfully updated.' })
  async updateAlbum(@Body() req: UpdateMomentRequest): Promise<MomentPreviewDto> {
    if (req === undefined) {
      throw new BadRequestException();
    }
    const moment: MomentPreviewDto = await this.commandBus.execute(new UpdateMomentCommand(req));

    return moment;
  }
}
