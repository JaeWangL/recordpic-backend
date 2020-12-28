import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../domain';

@Injectable()
export default class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async createAsync(newUser: UserEntity): Promise<UserEntity> {
    const user = await this.userRepo.save(newUser);

    return user;
  }

  async findByEmailAsync(email: string): Promise<UserEntity | undefined> {
    const user = await this.userRepo.findOne({
      where: {
        email,
        emailConfirmed: true,
      },
    });

    return user;
  }

  async findByIdAsync(id: number): Promise<UserEntity | undefined> {
    const user = await this.userRepo.findOne(id, {
      where: {
        emailConfirmed: true,
      },
    });

    return user;
  }

  async updateAsync(updatedUser: UserEntity): Promise<UserEntity> {
    const user = await this.userRepo.save(updatedUser);

    return user;
  }
}
