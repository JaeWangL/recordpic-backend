import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UpdatePhotoType } from '@common/enum-types';
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

export class DeleteMomentRequest {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly id: number;
}

export class UpdatePhotoWithMomentRequest {
  @ApiProperty({ type: Number, enum: UpdatePhotoType })
  readonly type: UpdatePhotoType;

  @ApiProperty({ type: Number, nullable: true })
  @IsNotEmpty()
  readonly id?: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly photoUrl: string;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ type: String, maxLength: 50 })
  @IsNotEmpty()
  readonly description: string;
}

export class UpdateMomentRequest {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly creatorMemberId: number;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  readonly momentDate: Date;

  @ApiProperty({ type: [UpdatePhotoWithMomentRequest] })
  @IsNotEmpty()
  readonly photos: UpdatePhotoWithMomentRequest[];
}
