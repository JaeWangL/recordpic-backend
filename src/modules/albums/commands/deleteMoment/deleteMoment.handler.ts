import { Logger, NotFoundException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { MomentService, PhotoService } from '../../services';
import DeleteMomentCommand from './deleteMoment.command';

@CommandHandler(DeleteMomentCommand)
export default class DeleteMomentHandler implements ICommandHandler<DeleteMomentCommand, boolean> {
  constructor(private readonly momentSvc: MomentService, private readonly photoSvc: PhotoService) {}

  async execute(command: DeleteMomentCommand): Promise<boolean> {
    Logger.log('Delet Moment...', 'DeletMomentCommand');
    const { req } = command;

    const moment = await this.momentSvc.findByIdAsync(req.id);
    if (!moment) {
      throw new NotFoundException('The moment does not exist');
    }

    await this.photoSvc.deleteByMomentIdAsync(req.id);

    await this.momentSvc.removeAsync(moment);

    return true;
  }
}
