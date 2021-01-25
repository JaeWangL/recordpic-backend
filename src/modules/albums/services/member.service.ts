import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberEntity } from '../domain';

@Injectable()
export default class MemberService {
  constructor(
    @InjectRepository(MemberEntity)
    private memberRepo: Repository<MemberEntity>,
  ) {}

  async createAsync(newMember: MemberEntity): Promise<MemberEntity> {
    return await this.memberRepo.save(newMember);
  }

  async deleteByIdAsync(id: number): Promise<void> {
    await this.memberRepo.delete({ id });
  }

  async findByIdAsync(id: number): Promise<MemberEntity | undefined> {
    return await this.memberRepo.findOne(id);
  }

  async findByAlbumIdAndUserIdAsync(albumId: number, userId: number): Promise<MemberEntity | undefined> {
    return await this.memberRepo.findOne({
      where: {
        albumId,
        userId,
      },
    });
  }

  async findByAlbumIdAsync(albumId: number, skip?: number, take?: number): Promise<[MemberEntity[], number]> {
    return await this.memberRepo.findAndCount({
      where: {
        albumId,
      },
      skip,
      take,
    });
  }

  async findByUserIdAsync(userId: number, includeAlbum = false): Promise<MemberEntity[]> {
    if (includeAlbum) {
      return await this.memberRepo.find({
        where: {
          userId,
        },
        relations: ['album'],
        order: {
          createdAt: 'DESC',
        },
      });
    }

    return await this.memberRepo.find({
      where: {
        userId,
      },
    });
  }

  async updateAsync(updatedMember: MemberEntity): Promise<MemberEntity> {
    return await this.memberRepo.save(updatedMember);
  }
}
