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
import { CreateCommentCommand, DeleteCommentCommand, GetCommentsPreviewQuery, UpdateCommentCommand } from '../commands';
import { CommentPreviewDto, CreateCommentRequest, DeleteCommentRequest, UpdateCommentRequest } from '../dtos';

@ApiTags('Comments')
@Controller('comments')
@ApiBearerAuth()
export default class CommentsController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get('moment/:momentId')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Get Comments Preview By MomentId' })
  @ApiPaginatedResponse(CommentPreviewDto)
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async getCommentsPreview(
    @Param('momentId') momentId: number,
    @Query('pageIndex') pageIndex = 0,
    @Query('pageSize') pageSize = 10,
  ): Promise<PaginatedItemsViewModel<CommentPreviewDto>> {
    const moments: PaginatedItemsViewModel<CommentPreviewDto> = await this.queryBus.execute(
      new GetCommentsPreviewQuery(momentId, pageIndex, pageSize),
    );

    return moments;
  }

  @Post()
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Create Comment' })
  @ApiResponse({ status: HttpStatus.OK, type: CommentPreviewDto, description: 'New comment is successfully created.' })
  async createComment(@Body() req: CreateCommentRequest): Promise<CommentPreviewDto> {
    if (req === undefined) {
      throw new BadRequestException();
    }
    const comment: CommentPreviewDto = await this.commandBus.execute(new CreateCommentCommand(req));

    return comment;
  }

  @Delete()
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Delete Comment' })
  @ApiResponse({ status: HttpStatus.OK, type: Boolean, description: 'The comment is successfully deleted.' })
  async deleteComment(@Body() req: DeleteCommentRequest): Promise<boolean> {
    if (req === undefined) {
      throw new BadRequestException();
    }
    const result: boolean = await this.commandBus.execute(new DeleteCommentCommand(req));

    return result;
  }

  @Put()
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Update Comment' })
  @ApiResponse({ status: HttpStatus.OK, type: CommentPreviewDto, description: 'The comment is successfully updated.' })
  async updateComment(@Body() req: UpdateCommentRequest): Promise<CommentPreviewDto> {
    if (req === undefined) {
      throw new BadRequestException();
    }
    const comment: CommentPreviewDto = await this.commandBus.execute(new UpdateCommentCommand(req));

    return comment;
  }
}
