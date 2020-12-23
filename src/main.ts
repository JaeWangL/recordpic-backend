import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import FastifyCompress from 'fastify-compress';
import FastifyHelmet from 'fastify-helmet';
import FastifyRateLimiter from 'fastify-rate-limit';
import { AppModule } from './app.module';

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

  app.enableCors();
  app.register(FastifyHelmet);
  app.register(FastifyCompress);
  app.register(FastifyRateLimiter, {
    max: 100,
    timeWindow: 60000,
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.SERVER_PORT || 3000, '0.0.0.0', async () => {
    // eslint-disable-next-line no-console
    console.log(`The server is running on ${process.env.SERVER_PORT || 3000} port`);
  });
}
bootstrap();
