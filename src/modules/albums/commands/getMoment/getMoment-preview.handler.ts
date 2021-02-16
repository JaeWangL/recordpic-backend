import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MomentPreviewDto } from '../../dtos';
import { MomentService } from '../../services';
import GetMomentPreviewQuery from './getMoment-preview.query';
import { toMomentPreviewDTO } from '../moment.extensions';

@QueryHandler(GetMomentPreviewQuery)
export default class GetMomentPreviewHandler implements IQueryHandler<GetMomentPreviewQuery, MomentPreviewDto> {
  constructor(private readonly momentSvc: MomentService) {}

  async execute(query: GetMomentPreviewQuery): Promise<MomentPreviewDto> {
    const { id } = query;

    const moment = await this.momentSvc.findByIdAsync(id);
    if (!moment) {
      throw new NotFoundException('moment does not exist');
    }

    return toMomentPreviewDTO(moment);
  }
}
