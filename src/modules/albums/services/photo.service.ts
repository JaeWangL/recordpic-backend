import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhotoEntity } from '../domain';

@Injectable()
export default class PhotoService {
  constructor(
    @InjectRepository(PhotoEntity)
    private photoRepo: Repository<PhotoEntity>,
  ) {}

  async createAsync(newPhoto: PhotoEntity): Promise<PhotoEntity> {
    return await this.photoRepo.save(newPhoto);
  }

  async createMultipleAsync(newPhotos: PhotoEntity[]): Promise<PhotoEntity[]> {
    return await this.photoRepo.save(newPhotos);
  }

  async deleteByIdAsync(id: number): Promise<void> {
    await this.photoRepo.delete({ id });
  }

  async findByIdAsync(id: number): Promise<PhotoEntity | undefined> {
    return await this.photoRepo.findOne(id);
  }

  async findByIdsAsync(ids: number[]): Promise<PhotoEntity[]> {
    return await this.photoRepo.findByIds(ids);
  }

  async findByAlbumIdAsync(albumId: number): Promise<PhotoEntity[]> {
    return await this.photoRepo.find({
      where: {
        albumId,
      },
    });
  }

  async findByMomentIdAsync(momentId: number): Promise<PhotoEntity[]> {
    return await this.photoRepo.find({
      where: {
        momentId,
      },
    });
  }

  async updateAsync(updatedPhoto: PhotoEntity): Promise<PhotoEntity> {
    return await this.photoRepo.save(updatedPhoto);
  }
}
