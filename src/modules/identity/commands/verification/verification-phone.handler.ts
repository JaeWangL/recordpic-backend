import { Logger } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { makeRandomNumber } from '@infrastructure/utils';
import NaverService from '@shared/naver/naver.service';
import { VerificationPhoneService } from '../../services';
import { VerificationPhoneEntity } from '../../domain';
import VerificationPhoneCommand from './verification-phone.command';

@CommandHandler(VerificationPhoneCommand)
export default class VerificationPhoneHandler implements ICommandHandler<VerificationPhoneCommand, boolean> {
  constructor(private readonly naverSvc: NaverService, private readonly verifyingSvc: VerificationPhoneService) {}

  async execute(command: VerificationPhoneCommand): Promise<boolean> {
    Logger.log('Verifying with phone...', 'VerificationPhoneCommand');
    const { req } = command;

    const verificationCode = makeRandomNumber(6);
    const newCode = new VerificationPhoneEntity(req.number, verificationCode, req.countryCode);
    await this.verifyingSvc.createAsync(newCode);

    this.naverSvc.sendSMS(`[Nest.JS] 인증번호 [${verificationCode}] 를 입력해 주세요.`, [req.number]);

    return true;
  }
}
