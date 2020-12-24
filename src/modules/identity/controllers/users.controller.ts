import { Controller, Get, HttpStatus, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAccessGuard from '@infrastructure/guards/jwt-access.guard';
import GetUserByIdQuery from '../commands/getUser/getUser-by-Id.query';
import { UserDto } from '../dtos';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export default class UsersController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':id')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Get User By Id' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto, description: 'Get User By Id.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async getById(@Param('id') id: number): Promise<UserDto | undefined> {
    const foundUser: UserDto = await this.queryBus.execute(new GetUserByIdQuery(id));
    if (foundUser === undefined) {
      throw new NotFoundException('The user does not exist');
    }

    return foundUser;
  }
}
