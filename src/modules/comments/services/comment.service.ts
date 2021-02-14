import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../domain';

@Injectable()
export default class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepo: Repository<CommentEntity>,
  ) {}

  async createAsync(newComment: CommentEntity): Promise<CommentEntity> {
    return await this.commentRepo.save(newComment);
  }

  async deleteByIdAsync(id: number): Promise<void> {
    await this.commentRepo.delete({ id });
  }

  async removeAsync(comment: CommentEntity): Promise<void> {
    await this.commentRepo.remove(comment);
  }

  async findByIdAsync(id: number): Promise<CommentEntity | undefined> {
    return await this.commentRepo.findOne(id);
  }

  async findByMomentIdAsync(momentId: number, skip?: number, take?: number): Promise<[CommentEntity[], number]> {
    return await this.commentRepo.findAndCount({
      where: {
        momentId,
      },
      order: {
        updatedAt: 'DESC',
      },
      skip,
      take,
    });
  }

  async updateAsync(updatedComment: CommentEntity): Promise<CommentEntity> {
    return await this.commentRepo.save(updatedComment);
  }
}
