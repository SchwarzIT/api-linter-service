import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { RulesModule } from '../src/rules/rules.module';
import validationPipe from 'src/helpers/validation.pipe';
import { mockPassword, mockPasswordHash, mockUsername } from './fixtures/auth';

describe('[Feature] Rules - /api-linting/api/v1/rules', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RulesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(validationPipe());
    await app.init();
  });

  describe('/api-linting/api/v1/rules (GET)', () => {
    it('returns a 200 if the user is authenticated', async () => {
      const res = await supertest(app.getHttpServer())
        .get('/api-linting/api/v1/rules')
        .query({ apiType: 'product_api' })
        .auth(mockUsername, mockPassword)
        .expect(200)
        .buffer()
        .expect('Content-Type', /vnd.yaml/)
        .expect('transfer-encoding', /chunked/)
        .expect('content-disposition', /spectral-product_api.yml/);

      // TODO implement logic to check if provided rules are the same as the ones in spectral.yml
    });

    it('returns a 401 if credentials are missing', async () => {
      return supertest(app.getHttpServer())
        .get('/api-linting/api/v1/rules')
        .query({ apiType: 'product_api' })
        .expect(401);
    });

    it('returns a 401 if the credentials are invalid', async () => {
      return supertest(app.getHttpServer())
        .get('/api-linting/api/v1/rules')
        .query({ apiType: 'product_api' })
        .auth(mockUsername, '42')
        .expect(401);
    });

    it('returns a 400 when the parameter "apiType" is missing', async () => {
      const { body } = await supertest(app.getHttpServer())
        .get('/api-linting/api/v1/rules')
        .auth(mockUsername, mockPassword)
        .expect(400);
      expect(body.message).toContain('"apiType" not provided in query params');
    });

    it('returns a 400 when the parameter "apiType" is invalid', async () => {
      const { body } = await supertest(app.getHttpServer())
        .get('/api-linting/api/v1/rules')
        .query({ apiType: '42' })
        .auth(mockUsername, mockPassword)
        .expect(400);
      expect(body.message).toContain('"apiType" not provided in query params');
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
