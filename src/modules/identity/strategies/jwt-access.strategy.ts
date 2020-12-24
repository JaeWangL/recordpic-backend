import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from '../domain';
import { JwtStrategyValidate } from './jwt-strategy-validate.interface';

@Injectable()
export default class JwtAccessStrategy extends PassportStrategy(Strategy, 'accessToken') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: UserEntity): Promise<JwtStrategyValidate> {
    return {
      id: payload.id,
      email: payload.email,
    };
  }
}
