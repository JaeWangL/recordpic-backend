import { Logger, UnauthorizedException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import Moment from 'moment';
import { parseSocialType } from '@infrastructure/utils/enum.utils';
import { AuthTokensDto } from '@modules/identity/dtos';
import { TokenEntity } from '@modules/identity/domain';
import { TokenService, UserService } from '@modules/identity/services';
import { SignInPayload } from './signIn.handler';
import SignInSocialCommand from './signIn-social.command';

@CommandHandler(SignInSocialCommand)
export default class SignInSocialHandler implements ICommandHandler<SignInSocialCommand, AuthTokensDto> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenSvc: TokenService,
    private readonly userSvc: UserService,
  ) {}

  async execute(command: SignInSocialCommand): Promise<AuthTokensDto> {
    Logger.log('SignIn with social account...', 'SignInSocialCommand');
    const { req } = command;

    const user = await this.userSvc.findByEmailWithSocialAsync(
      req.email,
      parseSocialType(req.socialType),
      req.socialId,
    );
    if (user === undefined) {
      throw new UnauthorizedException('Email or SocialId is invalid');
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
