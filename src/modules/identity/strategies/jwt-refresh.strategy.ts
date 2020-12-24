import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from '../domain';
import { JwtStrategyValidate } from './jwt-strategy-validate.interface';

@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refreshToken') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
    });
  }

  async validate(payload: UserEntity): Promise<JwtStrategyValidate> {
    return {
      id: payload.id,
      email: payload.email,
    };
  }
}
