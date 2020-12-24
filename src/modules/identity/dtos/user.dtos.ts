import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty({ type: Number })
  readonly id: number;

  @ApiProperty({ type: String, maxLength: 256 })
  @IsNotEmpty()
  readonly email: string;
}
