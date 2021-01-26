import { BadRequestException, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VerificationSignUpCommand } from '../commands';

@ApiTags('Verifications')
@Controller('verifications')
export default class VerificationsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('signUp/:shortCode')
  @ApiOperation({ summary: 'Verifying SignUp with mail' })
  @ApiResponse({ status: HttpStatus.OK, type: Boolean, description: 'verifying is successfully completed.' })
  async verifyingSignUp(@Param('shortCode') shortCode: string): Promise<boolean> {
    if (!shortCode) {
      throw new BadRequestException();
    }
    const result: boolean = await this.commandBus.execute(new VerificationSignUpCommand(shortCode));

    return result;
  }
}
