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
import { TokenRepository, UserRepository } from './repositories';

const AllRepositories = [TokenRepository, UserRepository];

@Module({
  imports: [
    CqrsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    TypeOrmModule.forFeature([TokenEntity, UserEntity]),
  ],
  controllers: [AuthController, UserController],
  providers: [JwtAccessStrategy, JwtRefreshStrategy, ...AllRepositories, ...AllCommandHandlers, ...AllQueryHandlers],
  exports: [...AllRepositories],
})
export default class IdentityModule {}
