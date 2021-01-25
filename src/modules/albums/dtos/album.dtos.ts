import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AlbumPreviewDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: String, maxLength: 30, nullable: true })
  readonly description?: string;

  @ApiProperty({ type: String, maxLength: 16 })
  @IsNotEmpty()
  readonly coverColor: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly coverUrl: string;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  readonly createdDate: Date;
}

export class CreateAlbumRequest {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty({ type: String, maxLength: 256 })
  @IsNotEmpty()
  readonly userEmail: string;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly userName: string;

  @ApiProperty({ type: String, nullable: true })
  readonly userImageUrl?: string;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: String, maxLength: 30, nullable: true })
  readonly description?: string;

  @ApiProperty({ type: String, maxLength: 16 })
  @IsNotEmpty()
  readonly coverColor: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly coverUrl: string;
}
