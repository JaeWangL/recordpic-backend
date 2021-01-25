import { BadRequestException, Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAccessGuard from '@infrastructure/guards/jwt-access.guard';
import { CreateAlbumCommand } from '../commands';
import { AlbumPreviewDto, CreateAlbumRequest } from '../dtos';

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
}
