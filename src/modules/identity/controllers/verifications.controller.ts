import { BadRequestException, Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { VerificationSignUpQuery } from '../commands';

@ApiTags('Verifications')
@Controller('verifications')
export default class VerificationsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('signUp/:shortCode')
  @ApiOperation({ summary: 'Verifying SignUp with mail' })
  @ApiResponse({ status: HttpStatus.OK, type: Boolean, description: 'verifying is successfully completed.' })
  async verifyingSignUp(@Res() res: FastifyReply, @Param('shortCode') shortCode: string): Promise<boolean> {
    if (!shortCode) {
      throw new BadRequestException();
    }
    const result: boolean = await this.queryBus.execute(new VerificationSignUpQuery(shortCode));
    if (!result) {
      return res.view('verification-mail-failed.hbs');
    }

    return res.view('verification-mail-succeed.hbs');
  }
}
