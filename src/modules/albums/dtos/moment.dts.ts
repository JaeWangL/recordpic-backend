import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreatePhotoWithMomentRequest } from './photo.dtos';

export class MomentPreviewDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly coverUrl: string;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  readonly momentDate: Date;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly photoCount: number;
}

export class CreateMomentRequest {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly albumId: number;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly creatorMemberId: number;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  readonly momentDate: Date;

  @ApiProperty({ type: [CreatePhotoWithMomentRequest] })
  @IsNotEmpty()
  readonly photos: CreatePhotoWithMomentRequest[];
}
