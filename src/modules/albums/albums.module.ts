import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllCommandHandlers, AllQueryHandlers } from './commands';
import { AlbumsController, MembersController, MomentsController, PhotosController } from './controllers';
import { AlbumEntity, MemberEntity, MomentEntity, PhotoEntity } from './domain';
import { AlbumService, MemberService, MomentService, PhotoService } from './services';

const AllControllers = [AlbumsController, MembersController, MomentsController, PhotosController];
const AllEntities = [AlbumEntity, MemberEntity, MomentEntity, PhotoEntity];
const AllServices = [AlbumService, MemberService, MomentService, PhotoService];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([...AllEntities])],
  controllers: [...AllControllers],
  providers: [...AllServices, ...AllCommandHandlers, ...AllQueryHandlers],
  exports: [...AllServices],
})
export default class AlbumsModule {}
