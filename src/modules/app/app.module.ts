import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import SharedModule from '@shared/shared.module';
import AlbumsModule from '../albums/albums.module';
import IdentityModule from '../identity/identity.module';
import UploadModule from '../upload/upload.module';
import { AppController, HealthController } from './controllers';
import AppService from './app.service';

const AllControllers = [AppController, HealthController];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TerminusModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_SERVER,
      port: process.env.DB_PORT ? +process.env.DB_PORT : 1433,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      schema: process.env.DB_SCHEMA,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      connectionTimeout: 30000,
      options: {
        encrypt: true,
        enableArithAbort: true,
      },
    }),
    SharedModule,
    AlbumsModule,
    IdentityModule,
    UploadModule,
  ],
  controllers: [...AllControllers],
  providers: [AppService],
})
export default class AppModule {}
