import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { SignInType } from '../domain/token.entity';

export class AuthTokensDto {
  @ApiProperty({ type: String, maxLength: 1024 })
  @IsNotEmpty()
  readonly accessToken: string;

  @ApiProperty({ type: String, maxLength: 1024 })
  @IsNotEmpty()
  readonly refreshToken: string;
}

export class TokenRefreshingRequest {
  @ApiProperty({ type: Number, enum: SignInType })
  readonly type: SignInType;

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

  @ApiProperty({ type: Number, enum: SignInType })
  readonly type: SignInType;
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

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: String, nullable: true })
  readonly imageUrl?: string;
}
