import { Logger } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import Bcrypt from 'bcrypt';
import Moment from 'moment';
import { AuthTokensDto } from '@modules/identity/dtos';
import { TokenEntity } from '@modules/identity/domain';
import { TokenRepository, UserRepository } from '@modules/identity/repositories';
import SignInCommand from './signIn.command';

export interface SignInPayload {
  readonly id: number;
  readonly email: string;
}

@CommandHandler(SignInCommand)
export default class SignInHandler implements ICommandHandler<SignInCommand, AuthTokensDto | undefined> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenRepo: TokenRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async execute(command: SignInCommand): Promise<AuthTokensDto | undefined> {
    Logger.log('SignIn...', 'SignInCommand');
    const { req } = command;

    const user = await this.userRepo.findByEmailAsync(req.email);
    if (user === undefined) {
      return undefined;
    }
    const passwordCompared = await Bcrypt.compare(req.password, user.passwordHash);
    if (passwordCompared === false) {
      return undefined;
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

    await this.tokenRepo.createAsync(
      new TokenEntity(user.id, refreshToken, Moment(new Date()).add(7, 'days').toDate()),
    );

    return {
      accessToken,
      refreshToken,
    } as AuthTokensDto;
  }
}
