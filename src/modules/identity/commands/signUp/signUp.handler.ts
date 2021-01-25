import { Logger } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import Bcrypt from 'bcrypt';
import { UserDto } from '@modules/identity/dtos';
import { UserEntity } from '@modules/identity/domain';
import { UserService } from '@modules/identity/services';
import SignUpCommand from './signUp.command';
import { toUserDTO } from '../user.extensions';

@CommandHandler(SignUpCommand)
export default class SignUpHandler implements ICommandHandler<SignUpCommand, UserDto> {
  constructor(private readonly userSvc: UserService) {}

  async execute(command: SignUpCommand): Promise<UserDto> {
    Logger.log('SignUp...', 'SignUpCommand');
    const { req } = command;

    const hashedPassword = await Bcrypt.hash(req.password, 10);
    const newUser = new UserEntity(req.email, hashedPassword, req.name, req.imageUrl);
    const user = await this.userSvc.createAsync(newUser);

    return toUserDTO(user);
  }
}
