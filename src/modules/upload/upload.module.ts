import { Module } from '@nestjs/common';
import { UploadController } from './controllers';

@Module({
  controllers: [UploadController],
})
export default class UploadModule {}
