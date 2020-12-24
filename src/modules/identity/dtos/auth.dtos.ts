import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthTokensDto {
  @ApiProperty({ type: String, maxLength: 1024 })
  @IsNotEmpty()
  readonly accessToken: string;

  @ApiProperty({ type: String, maxLength: 1024 })
  @IsNotEmpty()
  readonly refreshToken: string;
}

export class SignInRequest {
  @ApiProperty({ type: String, maxLength: 256 })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly password: string;
}

export class SignUpRequest {
  @ApiProperty({ type: String, maxLength: 256 })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly password: string;
}
