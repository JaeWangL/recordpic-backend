import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../domain';

@Injectable()
export default class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepo: Repository<AlbumEntity>,
  ) {}

  async createAsync(newAlbum: AlbumEntity): Promise<AlbumEntity> {
    return await this.albumRepo.save(newAlbum);
  }

  async deleteByIdAsync(id: number): Promise<void> {
    await this.albumRepo.delete({ id });
  }

  async findByIdAsync(id: number): Promise<AlbumEntity | undefined> {
    return await this.albumRepo.findOne(id);
  }

  async findByInviteCodeAsync(inviteCode: string): Promise<AlbumEntity | undefined> {
    return await this.albumRepo.findOne({
      where: {
        inviteCode,
      },
    });
  }

  async updateAsync(updatedAlbum: AlbumEntity): Promise<AlbumEntity> {
    return await this.albumRepo.save(updatedAlbum);
  }
}
