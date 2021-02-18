import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Put, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAccessGuard from '@infrastructure/guards/jwt-access.guard';
import { GetUserByIdQuery, UpdateProfileCommand } from '../commands';
import { UpdateProfileRequest, UserDto } from '../dtos';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export default class UsersController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get(':id')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Get User By Id' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto, description: 'Get User By Id.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async getById(@Param('id') id: number): Promise<UserDto> {
    const foundUser: UserDto = await this.queryBus.execute(new GetUserByIdQuery(id));

    return foundUser;
  }

  @Put('profile')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Update Profile' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto, description: 'The user is successfully updated.' })
  async updateProfile(@Body() req: UpdateProfileRequest): Promise<UserDto> {
    if (!req) {
      throw new BadRequestException();
    }
    const user: UserDto = await this.commandBus.execute(new UpdateProfileCommand(req));

    return user;
  }
}
