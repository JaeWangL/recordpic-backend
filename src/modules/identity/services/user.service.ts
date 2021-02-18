import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../domain';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userSvc: Repository<UserEntity>,
  ) {}

  async createAsync(newUser: UserEntity): Promise<UserEntity> {
    return await this.userSvc.save(newUser);
  }

  async findByEmailAsync(email: string): Promise<UserEntity | undefined> {
    return await this.userSvc.findOne({
      where: {
        email,
        emailConfirmed: true,
      },
    });
  }

  async findByEmailWithSocialAsync(
    email: string,
    socialType: number,
    socialId: string,
  ): Promise<UserEntity | undefined> {
    return await this.userSvc.findOne({
      where: {
        email,
        emailConfirmed: true,
        socialType,
        socialId,
      },
    });
  }

  async findByIdAsync(id: number, emailConfirmed = true): Promise<UserEntity | undefined> {
    return await this.userSvc.findOne(id, {
      where: {
        emailConfirmed,
      },
    });
  }

  async updateAsync(updatedUser: UserEntity): Promise<UserEntity> {
    return await this.userSvc.save(updatedUser);
  }
}
