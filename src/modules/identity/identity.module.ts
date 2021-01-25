import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import JwtAccessStrategy from './strategies/jwt-access.strategy';
import JwtRefreshStrategy from './strategies/jwt-refresh.strategy';
import { AllCommandHandlers, AllQueryHandlers } from './commands';
import { AuthController, UserController } from './controllers';
import { TokenEntity, UserEntity } from './domain';
import { TokenService, UserService } from './services';

const AllControllers = [AuthController, UserController];
const AllEntities = [TokenEntity, UserEntity];
const AllServices = [TokenService, UserService];

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
