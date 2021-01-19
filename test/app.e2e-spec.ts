import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import Request from 'supertest';
import AppModule from '../src/modules/app/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    Request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  });
});
