import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import FastifyCompress from 'fastify-compress';
import FastifyHelmet from 'fastify-helmet';
import FastifyMultipart from 'fastify-multipart';
import FastifyRateLimiter from 'fastify-rate-limit';
import Handlebars from 'handlebars';
import { join } from 'path';
import PointOfView from 'point-of-view';
import HttpExceptionFilter from '@infrastructure/filters/http-exception.filter';
import AppModule from '@modules/app/app.module';
import SharedModule from '@shared/shared.module';
import LoggerService from '@shared/logger/logger.service';

/**
 * NOTE
 * Change entryFile from `main.ts` to `server.ts`
 * for using Azure App Service
 * https://docs.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux#run-with-pm2
 * You can change entryFile in `nest-cli.json`
 */
async function bootstrap() {
  const fAdapt = new FastifyAdapter();
  fAdapt.register(FastifyMultipart);
  fAdapt.register(PointOfView, {
    engine: {
      handlebars: Handlebars,
    },
    templates: join(__dirname, '..', 'views'),
  });
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fAdapt);

  const options = new DocumentBuilder()
    .setTitle('API v1')
    .setDescription('The boilerplate API for nest.js')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      description: `JWT Authorization header using the Bearer scheme.
\r\n\r\nEnter 'Bearer' [space] and then your token in client application.
\r\n\r\nExample: 'Bearer 12345abcdef'`,
      name: 'Authorization',
      in: 'Header',
      scheme: 'Bearer',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const loggerService = app.select(SharedModule).get(LoggerService);
  app.useLogger(loggerService);

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });
  app.enableCors();
  app.register(FastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  }); // from `https://docs.nestjs.com/openapi/introduction`
  app.register(FastifyCompress);
  app.register(FastifyRateLimiter, {
    max: 100, // limit each IP to 100 requests per windowMs
    timeWindow: 2 * 60 * 1000, // 2 minutes
  });

  app.useGlobalFilters(new HttpExceptionFilter(loggerService));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.SERVER_PORT || 3000, process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1');
}

bootstrap();
