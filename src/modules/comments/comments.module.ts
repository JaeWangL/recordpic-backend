import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllCommandHandlers, AllQueryHandlers } from './commands';
import { CommentsController } from './controllers';
import { CommentEntity } from './domain';
import { CommentService } from './services';

const AllControllers = [CommentsController];
const AllEntities = [CommentEntity];
const AllServices = [CommentService];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([...AllEntities])],
  controllers: [...AllControllers],
  providers: [...AllServices, ...AllCommandHandlers, ...AllQueryHandlers],
  exports: [...AllServices],
})
export default class CommentsModule {}
