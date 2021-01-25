import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { MemberRankType } from '../domain/member.entity';
import { AlbumPreviewDto } from './album.dtos';

export class MemberPreviewDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly id: number;

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

  @ApiProperty({ type: Number, enum: MemberRankType })
  @IsNotEmpty()
  readonly rank: MemberRankType;
}

export class MemberWithAlbumDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({ type: Number, enum: MemberRankType })
  @IsNotEmpty()
  readonly rank: MemberRankType;

  @ApiProperty({ type: AlbumPreviewDto })
  @IsNotEmpty()
  readonly album: AlbumPreviewDto;
}

export class CreateMemberRequest {
  @ApiProperty({ type: String, nullable: true })
  readonly albumCode?: string;

  @ApiProperty({ type: Number, nullable: true })
  readonly albumId?: number;

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
}
