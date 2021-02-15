import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { NotificationType } from '@common/enum-types';

export class CreateNotificationRequest {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty({ type: Number, enum: NotificationType })
  readonly type: NotificationType;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly memberName: string;

  @ApiProperty({ type: String, nullable: true })
  readonly memberImageUrl?: string;

  @ApiProperty({ type: Number, nullable: true })
  readonly albumId?: number;

  @ApiProperty({ type: Number, nullable: true })
  readonly momentId?: number;
}

export class NotificationPreviewDto {
  @ApiProperty({ type: Number, enum: NotificationType })
  readonly type: NotificationType;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly memberName: string;

  @ApiProperty({ type: String, nullable: true })
  readonly memberImageUrl?: string;

  @ApiProperty({ type: Number, nullable: true })
  readonly albumId?: number;

  @ApiProperty({ type: Number, nullable: true })
  readonly momentId?: number;
}
