import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { HealthProbeModule } from '../src/health-probe/health-probe.module';

describe('[Feature] Health Probe - /.well-known/live', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HealthProbeModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/.well-known/live (GET)', async () => {
    return supertest(app.getHttpServer()).get('/.well-known/live').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
