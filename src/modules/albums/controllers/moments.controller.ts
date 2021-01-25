import { BadRequestException, Body, Controller, Get, HttpStatus, Query, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import PaginatedItemsViewModel from '@common/paginated-Items.viewModel';
import JwtAccessGuard from '@infrastructure/guards/jwt-access.guard';
import { ApiPaginatedResponse } from '@infrastructure/decorators';
import { CreateMomentCommand, GetMomentsPreviewQuery } from '../commands';
import { MomentPreviewDto, CreateMomentRequest } from '../dtos';

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
}
