import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from '../domain';

@Injectable()
export default class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notifyingSvc: Repository<NotificationEntity>,
  ) {}

  async createAsync(newNotification: NotificationEntity): Promise<NotificationEntity> {
    return await this.notifyingSvc.save(newNotification);
  }

  async deleteByUserIdAsync(userId: number): Promise<void> {
    await this.notifyingSvc.delete({ userId });
  }

  async findMultipleByUserIdAsync(
    userId: number,
    skip?: number,
    take?: number,
  ): Promise<[NotificationEntity[], number]> {
    return await this.notifyingSvc.findAndCount({
      where: {
        userId,
      },
      skip,
      take,
    });
  }
}
