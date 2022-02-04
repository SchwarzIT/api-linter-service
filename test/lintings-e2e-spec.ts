import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { CreateLintingDto } from '../src/lintings/create-linting.dto';
import { LintingsModule } from '../src/lintings/lintings.module';
import { CreatedLintingDto } from 'src/lintings/created-linting.dto';
import validationPipe from 'src/helpers/validation.pipe';
import { mockUsername, mockPassword, mockPasswordHash } from './fixtures/auth';
import { apiSpecAsBase64 } from './fixtures/apiSpec';

describe('[Feature] Lintings - /api-linting/api/v1/lintings', () => {
  let app: INestApplication;
  const requestBody: CreateLintingDto = {
    apiType: 'product_api',
    apiSpecAsBase64,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [LintingsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(validationPipe());
    await app.init();
  });

  describe('POST', () => {
    it('successfully creates a new linting', async () => {
      return supertest(app.getHttpServer())
        .post('/api-linting/api/v1/lintings')
        .auth(mockUsername, mockPassword)
        .send(requestBody)
        .expect(HttpStatus.CREATED)
        .then(({ body }: { body: CreatedLintingDto }) => {
          expect(body.description).toBe(
            'Given API Spec DOES comply with company API rules.',
          );
          expect(body.linkApiRules).toBe(
            'https://onedirection.schwarz/architecture-best-practices/apis/',
          );
          expect(body).toMatchSnapshot('lintingResultSwaggerFile');
        });
    });

    it('failes with a bad request response if the apiType is missing', () => {
      return supertest(app.getHttpServer())
        .post('/api-linting/api/v1/lintings')
        .auth(mockUsername, mockPassword)
        .send({ apiSpecAsBase64: 'spec' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('failes with a bad request response if the apiSpec is missing', () => {
      return supertest(app.getHttpServer())
        .post('/api-linting/api/v1/lintings')
        .auth(mockUsername, mockPassword)
        .send({ apiType: 'product_api' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('failes when the request is lacking authorization', () => {
      return supertest(app.getHttpServer())
        .post('/api-linting/api/v1/lintings')
        .send(requestBody)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
