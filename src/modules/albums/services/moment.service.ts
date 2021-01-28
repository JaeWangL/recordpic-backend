import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MomentEntity } from '../domain';

@Injectable()
export default class MomentService {
  constructor(
    @InjectRepository(MomentEntity)
    private momentRepo: Repository<MomentEntity>,
  ) {}

  async createAsync(newMoment: MomentEntity): Promise<MomentEntity> {
    return await this.momentRepo.save(newMoment);
  }

  async deleteByIdAsync(id: number): Promise<void> {
    await this.momentRepo.delete({ id });
  }

  async removeAsync(moment: MomentEntity): Promise<void> {
    await this.momentRepo.remove(moment);
  }

  async findByIdAsync(id: number): Promise<MomentEntity | undefined> {
    return await this.momentRepo.findOne(id);
  }

  async findByAlbumIdAsync(
    albumId: number,
    includePhotos = false,
    skip?: number,
    take?: number,
  ): Promise<[MomentEntity[], number]> {
    if (includePhotos) {
      return await this.momentRepo.findAndCount({
        where: {
          albumId,
        },
        relations: ['photos'],
        order: {
          momentDate: 'DESC',
        },
        skip,
        take,
      });
    }

    return await this.momentRepo.findAndCount({
      where: {
        albumId,
      },
      order: {
        momentDate: 'DESC',
      },
    });
  }

  async updateAsync(updatedMoment: MomentEntity): Promise<MomentEntity> {
    return await this.momentRepo.save(updatedMoment);
  }
}
