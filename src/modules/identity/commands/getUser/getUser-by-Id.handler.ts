import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserDto } from '@modules/identity/dtos';
import { UserRepository } from '@modules/identity/repositories';
import GetUserByIdQuery from './getUser-by-Id.query';
import { toUserDTO } from '../user.extensions';

@QueryHandler(GetUserByIdQuery)
export default class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery, UserDto | undefined> {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(query: GetUserByIdQuery): Promise<UserDto | undefined> {
    const { id } = query;

    const user = await this.userRepo.findByIdAsync(id);
    if (user === undefined) {
      return undefined;
    }

    return toUserDTO(user);
  }
}
