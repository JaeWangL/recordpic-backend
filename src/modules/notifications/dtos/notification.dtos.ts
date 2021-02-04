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
  readonly userName: string;
}

export class NotificationDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty({ type: Number, enum: NotificationType })
  readonly type: NotificationType;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly userName: string;
}
