import { Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import Bcrypt from 'bcrypt';
import Moment from 'moment';
import { AuthTokensDto } from '@modules/identity/dtos';
import { TokenEntity } from '@modules/identity/domain';
import { TokenService, UserService } from '@modules/identity/services';
import SignInCommand from './signIn.command';

export interface SignInPayload {
  readonly id: number;
  readonly email: string;
}

@CommandHandler(SignInCommand)
export default class SignInHandler implements ICommandHandler<SignInCommand, AuthTokensDto> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenSvc: TokenService,
    private readonly userSvc: UserService,
  ) {}

  async execute(command: SignInCommand): Promise<AuthTokensDto> {
    Logger.log('SignIn...', 'SignInCommand');
    const { req } = command;

    const user = await this.userSvc.findByEmailAsync(req.email);
    if (user === undefined) {
      throw new NotFoundException('Email is invalid');
    }
    const passwordCompared = await Bcrypt.compare(req.password, user.passwordHash);
    if (passwordCompared === false) {
      throw new UnauthorizedException('Password is invalid');
    }

    const payload: SignInPayload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
      secret: process.env.ACCESS_TOKEN_SECRET,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
      secret: process.env.REFRESH_TOKEN_SECRET,
    });

    await this.tokenSvc.createAsync(
      new TokenEntity(user.id, req.type, refreshToken, Moment(new Date()).add(7, 'days').toDate()),
    );

    return {
      accessToken,
      refreshToken,
    } as AuthTokensDto;
  }
}
