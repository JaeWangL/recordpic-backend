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

export class TokenRefreshingRequest {
  /**
   * NOTE
   * 0: Web
   * 1: Mobile
   */
  @ApiProperty({ type: Number })
  readonly type: number;

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

  /**
   * NOTE
   * 0: Web
   * 1: Mobile
   */
  @ApiProperty({ type: Number })
  readonly type: number;
}

export class SignOutRequest {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly userId: number;
}

export class SignUpRequest {
  @ApiProperty({ type: String, maxLength: 256 })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly password: string;
}
