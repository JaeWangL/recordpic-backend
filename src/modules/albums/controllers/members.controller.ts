import { BadRequestException, Body, Controller, Get, HttpStatus, Query, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import PaginatedItemsViewModel from '@common/paginated-Items.viewModel';
import JwtAccessGuard from '@infrastructure/guards/jwt-access.guard';
import { ApiPaginatedResponse } from '@infrastructure/decorators';
import { CreateMemberCommand, GetMembersPreviewQuery, GetMembersWithAlbumQuery } from '../commands';
import { MemberPreviewDto, MemberWithAlbumDto, CreateMemberRequest } from '../dtos';

@ApiTags('Members')
@Controller('members')
@ApiBearerAuth()
export default class MembersController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get('album/:albumId')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Get Members Preview By AlbumId' })
  @ApiPaginatedResponse(MemberPreviewDto)
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async getMembersPreview(
    @Param('albumId') albumId: number,
    @Query('pageIndex') pageIndex = 0,
    @Query('pageSize') pageSize = 10,
  ): Promise<PaginatedItemsViewModel<MemberPreviewDto>> {
    const members: PaginatedItemsViewModel<MemberPreviewDto> = await this.queryBus.execute(
      new GetMembersPreviewQuery(albumId, pageIndex, pageSize),
    );

    return members;
  }

  @Get('user/:userId')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Get Members with album By UserId' })
  @ApiResponse({ status: HttpStatus.OK, type: [MemberPreviewDto], description: 'Get Members with album By UserId.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async getMembersWithAlbum(@Param('userId') userId: number): Promise<MemberWithAlbumDto[]> {
    const members: MemberWithAlbumDto[] = await this.queryBus.execute(new GetMembersWithAlbumQuery(userId));

    return members;
  }

  @Post()
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Create Member' })
  @ApiResponse({ status: HttpStatus.OK, type: MemberPreviewDto, description: 'New member is successfully created.' })
  async createMember(@Body() req: CreateMemberRequest): Promise<MemberPreviewDto> {
    if (req === undefined) {
      throw new BadRequestException();
    }
    const member: MemberPreviewDto = await this.commandBus.execute(new CreateMemberCommand(req));

    return member;
  }
}
