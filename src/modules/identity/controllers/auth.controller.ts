import { BadRequestException, Body, Controller, HttpStatus, NotFoundException, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import SignInCommand from '../commands/signIn/signIn.command';
import SignUpCommand from '../commands/signUp/signUp.command';
import { AuthTokensDto, SignInRequest, SignUpRequest, UserDto } from '../dtos';

@ApiTags('Auth')
@Controller('auth')
export default class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('signIn')
  @ApiOperation({ summary: 'SignIn' })
  @ApiResponse({ status: HttpStatus.OK, type: AuthTokensDto, description: 'signed in successfully.' })
  async signIn(@Body() req: SignInRequest): Promise<AuthTokensDto | undefined> {
    if (req === undefined) {
      throw new BadRequestException();
    }
    const tokens: AuthTokensDto = await this.commandBus.execute(new SignInCommand(req));
    if (tokens === undefined) {
      throw new NotFoundException('Email or password is invalid');
    }

    return tokens;
  }

  @Post('signUp')
  @ApiOperation({ summary: 'SignUp' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserDto, description: 'User Created.' })
  async signUp(@Body() req: SignUpRequest): Promise<UserDto | undefined> {
    if (req === undefined) {
      throw new BadRequestException();
    }
    const user: UserDto = await this.commandBus.execute(new SignUpCommand(req));

    return user;
  }
}
