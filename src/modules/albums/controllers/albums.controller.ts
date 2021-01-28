import { BadRequestException, Body, Controller, Delete, HttpStatus, Post, Put, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAccessGuard from '@infrastructure/guards/jwt-access.guard';
import { CreateAlbumCommand, DeleteAlbumCommand, UpdateAlbumCommand } from '../commands';
import { AlbumPreviewDto, CreateAlbumRequest, DeleteAlbumRequest, UpdateAlbumRequest } from '../dtos';

@ApiTags('Albums')
@Controller('albums')
@ApiBearerAuth()
export default class AlbumsController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Create Album' })
  @ApiResponse({ status: HttpStatus.OK, type: AlbumPreviewDto, description: 'New album is successfully created.' })
  async createAlbum(@Body() req: CreateAlbumRequest): Promise<AlbumPreviewDto> {
    if (req === undefined) {
      throw new BadRequestException();
    }
    const album: AlbumPreviewDto = await this.commandBus.execute(new CreateAlbumCommand(req));

    return album;
  }

  @Delete()
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Delete Album' })
  @ApiResponse({ status: HttpStatus.OK, type: Boolean, description: 'The album is successfully deleted.' })
  async deleteAlbum(@Body() req: DeleteAlbumRequest): Promise<boolean> {
    if (req === undefined) {
      throw new BadRequestException();
    }
    const result: boolean = await this.commandBus.execute(new DeleteAlbumCommand(req));

    return result;
  }

  @Put()
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Update Album' })
  @ApiResponse({ status: HttpStatus.OK, type: Boolean, description: 'The album is successfully updated.' })
  async updateAlbum(@Body() req: UpdateAlbumRequest): Promise<AlbumPreviewDto> {
    if (req === undefined) {
      throw new BadRequestException();
    }
    const album: AlbumPreviewDto = await this.commandBus.execute(new UpdateAlbumCommand(req));

    return album;
  }
}
