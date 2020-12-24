import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import FastifyCompress from 'fastify-compress';
import FastifyHelmet from 'fastify-helmet';
import FastifyRateLimiter from 'fastify-rate-limit';
import HttpExceptionFilter from '@infrastructure/filters/http-exception.filter';
import AppModule from '@modules/app/app.module';
import SharedModule from '@shared/shared.module';
import LoggerService from '@shared/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const options = new DocumentBuilder()
    .setTitle('API v1')
    .setDescription('The boilerplate API for nest.js')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const loggerService = app.select(SharedModule).get(LoggerService);
  app.useLogger(loggerService);

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
    timeWindow: 15 * 60 * 1000, // 15 minutes
  });

  app.useGlobalFilters(new HttpExceptionFilter(loggerService));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(
    process.env.SERVER_PORT || 3000,
    process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1',
    async () => {
      // eslint-disable-next-line no-console
      console.log(`The server is running on ${process.env.SERVER_PORT || 3000} port`);
    },
  );
}
bootstrap();
