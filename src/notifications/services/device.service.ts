import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceEntity } from '../domain';

@Injectable()
export default class DeviceService {
  constructor(
    @InjectRepository(DeviceEntity)
    private deviceRepo: Repository<DeviceEntity>,
  ) {}

  async createAsync(newDevice: DeviceEntity): Promise<DeviceEntity> {
    return await this.deviceRepo.save(newDevice);
  }

  async deleteByUserIdAsync(userId: number): Promise<void> {
    await this.deviceRepo.delete({ userId });
  }

  async deleteByUserIdAndTypeAsync(userId: number, type: number): Promise<void> {
    await this.deviceRepo.delete({ userId, type });
  }

  async findByUserIdAndTypeAsync(userId: number, type: number): Promise<DeviceEntity | undefined> {
    return await this.deviceRepo.findOne({
      where: {
        userId,
        type,
      },
    });
  }

  async findMultipleByUserIdAsync(userId: number): Promise<[DeviceEntity[], number]> {
    return await this.deviceRepo.findAndCount({
      where: {
        userId,
      },
    });
  }

  async updateAsync(updatedDevice: DeviceEntity): Promise<DeviceEntity> {
    return await this.deviceRepo.save(updatedDevice);
  }
}
