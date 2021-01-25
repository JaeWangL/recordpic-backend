import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserDto } from '@modules/identity/dtos';
import { UserService } from '@modules/identity/services';
import GetUserByIdQuery from './getUser-by-Id.query';
import { toUserDTO } from '../user.extensions';

@QueryHandler(GetUserByIdQuery)
export default class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery, UserDto> {
  constructor(private readonly userSvc: UserService) {}

  async execute(query: GetUserByIdQuery): Promise<UserDto> {
    const { id } = query;

    const user = await this.userSvc.findByIdAsync(id);
    if (user === undefined) {
      throw new NotFoundException('The user does not exist');
    }

    return toUserDTO(user);
  }
}
