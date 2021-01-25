import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SendSMSRequest {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  content: string;

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  toNumbers: string[];
}
