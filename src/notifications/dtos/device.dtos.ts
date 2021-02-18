import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { DeviceTokenType } from '@common/enum-types';

export class DevicePreviewDto {
  @ApiProperty({ type: Number, enum: DeviceTokenType })
  readonly type: DeviceTokenType;

  @ApiProperty({ type: String })
  readonly deviceToken: string;
}

export class CreateDeviceRequest {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty({ type: Number, enum: DeviceTokenType })
  readonly type: DeviceTokenType;

  @ApiProperty({ type: String })
  readonly deviceToken: string;
}

export class DeleteDeviceRequest {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty({ type: Number, enum: DeviceTokenType })
  readonly type: DeviceTokenType;
}

export class UpdateDeviceRequest {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty({ type: Number, enum: DeviceTokenType })
  readonly type: DeviceTokenType;

  @ApiProperty({ type: String })
  readonly deviceToken: string;
}
