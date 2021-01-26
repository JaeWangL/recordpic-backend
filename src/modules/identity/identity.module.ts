import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import JwtAccessStrategy from './strategies/jwt-access.strategy';
import JwtRefreshStrategy from './strategies/jwt-refresh.strategy';
import { AllCommandHandlers, AllQueryHandlers } from './commands';
import { AuthController, UserController, VerificationsController } from './controllers';
import { TokenEntity, UserEntity, VerificationMailEntity, VerificationPhoneEntity } from './domain';
import { TokenService, UserService, VerificationMailService, VerificationPhoneService } from './services';

const AllControllers = [AuthController, UserController, VerificationsController];
const AllEntities = [TokenEntity, UserEntity, VerificationMailEntity, VerificationPhoneEntity];
const AllServices = [TokenService, UserService, VerificationMailService, VerificationPhoneService];

@Module({
  imports: [
    CqrsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    TypeOrmModule.forFeature([...AllEntities]),
  ],
  controllers: [...AllControllers],
  providers: [JwtAccessStrategy, JwtRefreshStrategy, ...AllServices, ...AllCommandHandlers, ...AllQueryHandlers],
  exports: [...AllServices],
})
export default class IdentityModule {}
