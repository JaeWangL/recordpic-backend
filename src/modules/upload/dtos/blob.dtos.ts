import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteFileRequest {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly fileName: string;
}

export class DeleteFilesRequest {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly fileNames: string[];
}
