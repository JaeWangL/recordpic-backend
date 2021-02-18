import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SendMailRequest {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  to: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ type: String, nullable: true })
  @IsNotEmpty()
  text?: string;

  @ApiProperty({ type: String, nullable: true })
  @IsNotEmpty()
  htmlText?: string;
}
