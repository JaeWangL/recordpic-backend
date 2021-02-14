import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CommentPreviewDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly userName: string;

  @ApiProperty({ type: String, nullable: true })
  readonly userImageUrl?: string;

  @ApiProperty({ type: String })
  readonly text: string;

  @ApiProperty({ type: Date })
  readonly updatedAt: Date;
}

export class CreateCommentRequest {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly albumId: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly momentId: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly userName: string;

  @ApiProperty({ type: String, nullable: true })
  readonly userImageUrl?: string;

  @ApiProperty({ type: String })
  readonly text: string;
}

export class DeleteCommentRequest {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly id: number;
}

export class UpdateCommentRequest {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({ type: String })
  readonly text: string;
}
