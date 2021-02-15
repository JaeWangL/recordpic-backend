import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceEntity } from '../domain';

@Injectable()
export default class DeviceService {
  constructor(
    @InjectRepository(DeviceEntity)
    private deviceSvc: Repository<DeviceEntity>,
  ) {}

  async createAsync(newDevice: DeviceEntity): Promise<DeviceEntity> {
    return await this.deviceSvc.save(newDevice);
  }

  async deleteByUserIdAsync(userId: number): Promise<void> {
    await this.deviceSvc.delete({ userId });
  }

  async findMultipleByUserIdAsync(userId: number): Promise<[DeviceEntity[], number]> {
    return await this.deviceSvc.findAndCount({
      where: {
        userId,
      },
    });
  }
}
