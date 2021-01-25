import { ForbiddenException, Logger, UnauthorizedException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '@modules/identity/services';
import { AuthTokensDto } from '@modules/identity/dtos';
import { SignInPayload } from '../signIn/signIn.handler';
import TokenRefreshingCommand from './tokenRefreshing.command';

export interface DecodedUser {
  readonly id: number;
  readonly email: string;
  readonly iat: number;
  readonly exp: number;
}

@CommandHandler(TokenRefreshingCommand)
export default class TokenRefreshingHandler implements ICommandHandler<TokenRefreshingCommand, AuthTokensDto> {
  constructor(private readonly jwtService: JwtService, private readonly tokenSvc: TokenService) {}

  async execute(command: TokenRefreshingCommand): Promise<AuthTokensDto> {
    const { req } = command;
    const decodedUser = this.jwtService.decode(req.refreshToken) as DecodedUser;
    if (!decodedUser) {
      throw new ForbiddenException('Incorrect token');
    }

    Logger.log(decodedUser);

    const oldRefreshToken = await this.tokenSvc.findByUserIdAndTokenAsync(decodedUser.id, req.type, req.refreshToken);
    if (oldRefreshToken === undefined) {
      throw new UnauthorizedException('Authentication credentials were missing or incorrect');
    }

    const payload: SignInPayload = {
      id: decodedUser.id,
      email: decodedUser.email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
      secret: process.env.ACCESS_TOKEN_SECRET,
    });

    return {
      accessToken,
      refreshToken: req.refreshToken,
    } as AuthTokensDto;
  }
}
