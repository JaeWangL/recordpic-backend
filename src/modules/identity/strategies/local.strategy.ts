/*
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { validate } from 'class-validator';
import { Strategy } from 'passport-local';
import { Request as ExpressRequest } from 'express';
import { SignInRequest } from '../dtos';
import { ValidateUserOutput } from './validate-user-output.interface';
import AuthService from '../auth.service';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(req: ExpressRequest, email: string, password: string): Promise<ValidateUserOutput> {
    const errors = await validate(new SignInRequest(req.body));

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
*/
