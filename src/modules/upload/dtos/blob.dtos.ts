import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteImageRequest {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly fileName: string;
}

export class DeleteImagesRequest {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly fileNames: string[];
}

export class DeleteProfilePhotoRequest {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly fileName: string;
}
