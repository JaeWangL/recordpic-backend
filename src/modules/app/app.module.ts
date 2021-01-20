import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import MulterModule from '@multer/multer.module';
import SharedModule from '@shared/shared.module';
import IdentityModule from '../identity/identity.module';
import UploadModule from '../upload/upload.module';
import AppController from './app.controller';
import AppService from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    // MulterModule.register(),
    SharedModule,
    IdentityModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
