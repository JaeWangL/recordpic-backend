import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PhotoPreviewDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly id: number;

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

export class CreatePhotoRequest {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly albumId: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly momentId: number;

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

export class CreatePhotoWithMomentRequest {
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
